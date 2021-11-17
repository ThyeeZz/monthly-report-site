import html2canvas from 'html2canvas';

export const screenShoot = async (element: HTMLElement) => {
  const canvas: HTMLCanvasElement = await html2canvas(element, {
    useCORS: true,
    backgroundColor: '#fff',
  });
  const src: string = canvas.toDataURL('image/png');
  return src;
};
