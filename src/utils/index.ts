import html2canvas from 'html2canvas';
import { TAreaData } from '../types';
import XLSX from 'xlsx';
import { IInfoFromFeishu } from '../types';

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
    return `${month + 1}月${day}日`;
  }
  return `${year}年${month + 1}月${day}日`;
};

export const getMonthNumber = (number: number) => {
  if (number >= 0) return number;
  return number + 12;
};

export const formatAreaData = (
  areaData: TAreaData,
  key: string
): { key: string; value: string }[] => {
  return Object.entries(areaData[key]).map(item => ({
    key: item[0],
    value: item[1],
  }));
};

export const handleReadInfoFile = <T extends unknown>(
  e: React.ChangeEvent<HTMLInputElement>,
  cb = (params: T[]) => {}
) => {
  const { files } = e.target;
  const fileReader = new FileReader();
  fileReader.onload = event => {
    try {
      const { result } = event.target as FileReader;
      // 以二进制流方式读取得到整份excel表格对象
      const workbook = XLSX.read(result, { type: 'binary' });
      let data: T[] = []; // 存储获取到的数据
      // 遍历每张工作表进行读取（这里默认只读取第一张表）

      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 利用 sheet_to_json 方法将 excel 转成 json 数据
          data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      cb(data);
    } catch (e) {
      // 这里可以抛出文件类型错误不正确的相关提示
      console.log('文件类型不正确');
      return;
    }
  };
  fileReader.readAsBinaryString(files![0]);
};
