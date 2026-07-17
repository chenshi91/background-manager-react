export const getDate=(timestamp:number)=>{
    const date = new Date(timestamp);
    // 补零函数
    const pad = (num: number) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 提取全部完整 <img .../> 标签
export const  getAllImgSrc=(html:string):string[]=> {
    // 1. 先拿到全部完整<img />标签数组
    const imgReg = /<img.*?\/>/g;
    const imgTagList = html.match(imgReg) || []; // 兜底为空数组，防止null报错
    // console.log('完整img标签数组：', imgTagList);

    // 2. 提取每个img里的src地址，生成纯图片链接数组（最常用）
    const srcArr = [];
    const srcReg = /src="(.*?)"/g;
    let match;
    while ((match = srcReg.exec(html)) !== null) {
        srcArr.push(match[1]);
    }
    return srcArr;
}