import html2canvas from 'html2canvas';

export const screenShoot = async (element: HTMLElement) => {
  const canvas: HTMLCanvasElement = await html2canvas(element, {
    useCORS: true,
    backgroundColor: '#fff',
    scale: 2,
  });
  const src: string = canvas.toDataURL('image/png');
  return src;
};

export const formatDate = (date: Date, format: string = 'birthday') => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (format === 'birthday') {
    return `${month}月${day}日`;
  }
  return `${year}年${month}月${day}日`;
};

export const getMonthNumber = (number: number) => {
  if (number >= 0) return number;
  return number + 12;
};
