import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as Sentry from '@sentry/browser';
import { jsPDF } from 'jspdf';

export async function handleDownloadPPTX(title, slidesContent, setLoading) {
  setLoading(true);
  try {
    const doc = new Document();

    slidesContent.forEach((slide, index) => {
      if (index === 0) {
        doc.addSection({
          children: [
            new Paragraph({
              text: title,
              heading: 'Heading1',
            }),
          ],
        });
      }
      doc.addSection({
        children: [
          new Paragraph({
            text: `Slide ${index + 1}`,
            heading: 'Heading2',
          }),
          new Paragraph({
            text: slide.content,
            bullet: { level: 0 },
          }),
        ],
      });
      if (slide.image) {
        doc.addSection({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: '',
                  break: 1,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '',
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '',
                }),
              ],
            }),
          ],
        });
      }
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title}.pptx`);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating PPTX:', error);
  } finally {
    setLoading(false);
  }
}

export async function handleDownloadWord(title, slidesContent, setLoading) {
  setLoading(true);
  try {
    const doc = new Document();

    doc.addSection({
      children: [
        new Paragraph({
          text: title,
          heading: 'Heading1',
        }),
        ...slidesContent
          .map((slide, index) => [
            new Paragraph({
              text: `Slide ${index + 1}`,
              heading: 'Heading2',
            }),
            new Paragraph({
              text: slide.content,
              bullet: { level: 0 },
            }),
            slide.image
              ? new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Image: ',
                      bold: true,
                    }),
                    new TextRun({
                      text: slide.image,
                      italics: true,
                    }),
                  ],
                })
              : null,
          ])
          .flat(),
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title}.docx`);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating Word document:', error);
  } finally {
    setLoading(false);
  }
}

export async function handleDownloadPDF(title, slidesContent, setLoading) {
  setLoading(true);
  try {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 10, 10);

    slidesContent.forEach((slide, index) => {
      doc.setFontSize(16);
      doc.text(`Slide ${index + 1}`, 10, 20 + index * 30);
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(slide.content, 180);
      doc.text(lines, 10, 25 + index * 30);
      if (slide.image) {
        doc.setFontSize(12);
        doc.text(`Image URL: ${slide.image}`, 10, 35 + index * 30);
      }
    });

    doc.save(`${title}.pdf`);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating PDF:', error);
  } finally {
    setLoading(false);
  }
}