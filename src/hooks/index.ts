import html2canvas from 'html2canvas';

export const useScreenShot = async(
  element:HTMLElement
)=>{
const canvas:HTMLCanvasElement = await html2canvas(element,{ useCORS: true});
const src:string = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");

const aEle = document.createElement('a');
  aEle.href = src;
  aEle.download = 'save.jpeg'
  aEle.click();
}
