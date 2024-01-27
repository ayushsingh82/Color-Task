import React, { useState, useRef } from 'react';
import ColorThief from 'colorthief';
import zorb from '../assets/zorb.png';

const Home = () => {

  const [selectedPath, setSelectedPath] = useState(null);
  const [currentColor, setCurrentColor] = useState('#000000');
  const [backgroundPathColor, setBackgroundPathColor] = useState('#800090');
  const [upperOuterQuadColor, setUpperOuterQuadColor] = useState('#FFFFFF');
  const [upperInnerQuadColor, setUpperInnerQuadColor] = useState('#000000');
  const [lowerOuterQuadColor, setLowerOuterQuadColor] = useState('#000000');
  const [lowerInnerQuadColor, setLowerInnerQuadColor] = useState('#FFFFFF');
  const [uploadedImage, setUploadedImage] = useState(null);

  const [backgroundPathPickerColor, setBackgroundPathPickerColor] = useState('#800090');
  const [otherPathsPickerColor, setOtherPathsPickerColor] = useState('#000000');

  const svgRef = useRef(null);

  const handleBackgroundPathColorChange = (color) => {
    setBackgroundPathPickerColor(color);
    setBackgroundPathColor(color);
  };

  const handleOtherPathsColorChange = (color) => {
    setOtherPathsPickerColor(color);
    if (selectedPath) {
      setCurrentColor(color);
      updateColor(selectedPath, color);
    }
  };

  const handleColorChange = (color) => {
    if (selectedPath) {
      setCurrentColor(color);
      updateColor(selectedPath, color);
    } else {
      setCurrentColor(color);
      setBackgroundPathColor(color);
    }
  };

  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setCurrentColor(
      path === 'backgroundPathColor' ? backgroundPathColor :
      path === 'upperOuterQuad' ? upperOuterQuadColor :
      path === 'upperInnerQuad' ? upperInnerQuadColor :
      path === 'lowerOuterQuad' ? lowerOuterQuadColor :
      path === 'lowerInnerQuad' ? lowerInnerQuadColor : '#000000'
    );
  };

  const updateColor = (path, color) => {
    switch (path) {
      case 'backgroundPathColor':
        setBackgroundPathColor(color);
        break;
      case 'upperOuterQuad':
        setUpperOuterQuadColor(color);
        break;
      case 'upperInnerQuad':
        setUpperInnerQuadColor(color);
        break;
      case 'lowerOuterQuad':
        setLowerOuterQuadColor(color);
        break;
      case 'lowerInnerQuad':
        setLowerInnerQuadColor(color);
        break;
      default:
        break;
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 6);
        // Set color palette for paths
        setUpperOuterQuadColor(`rgb(${colorPalette[0].join(', ')})`);
        setUpperInnerQuadColor(`rgb(${colorPalette[1].join(', ')})`);
        setLowerOuterQuadColor(`rgb(${colorPalette[2].join(', ')})`);
        setLowerInnerQuadColor(`rgb(${colorPalette[3].join(', ')})`);
        // Set background color
        setBackgroundPathColor(`rgb(${colorPalette[4].join(', ')})`);
        // Set default color
        setCurrentColor(`rgb(${colorPalette[5].join(', ')})`);
        // Set uploaded image
        setUploadedImage(event.target.result);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const downloadSvg = () => {
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'edited_image.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'edited_image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
  };

  return (
    <div className='flex justify-center items-center flex-col 2xl:p-[5px] 2xl:pt-[0px] pt-[80px]'>
      <div className='text-[#800090] text-xl font-sans-serif pt-2'>
        Welcome To Mumbai
      </div>
      <div className='pt-2 text-xs text-center text-white/40'>
        Tap the colors to edit them or
      </div>
      <div class="flex items-end justify-end m-2 mb-4">
        <label for="file" class="px-2 py-2 text-xs border rounded text-white bg-white/10 border-white/10 transition-transform transform hover:scale-105">Generate palette from image</label>
        <input id="file" class="hidden file:p-0 file:border-none file:text-white file:bg-black" placeholder="Upload" type="file" accept="image/*" onChange={uploadImage} /> 
      </div>
      <svg
        ref={svgRef}
        className='border cursor-pointer rounded-md aspect-auto border-white/10 w-[300px] 2xl:w-[380px]'
        viewBox="0 0 2400 2400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="2400" height="2400" fill={backgroundPathColor} />
        {/* Upper Outer Quad */}
        <path
          d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z"
          fill={selectedPath === 'upperOuterQuad' ? currentColor : upperOuterQuadColor}
          onClick={() => handlePathSelect('upperOuterQuad')}
        />
        {/* Upper Inner Quad */}
        <path
          d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z"
          fill={selectedPath === 'upperInnerQuad' ? currentColor : upperInnerQuadColor}
          onClick={() => handlePathSelect('upperInnerQuad')}
        />
        {/* Lower Outer Quad */}
        <path
          d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z"
          fill={selectedPath === 'lowerOuterQuad' ? currentColor : lowerOuterQuadColor}
          onClick={() => handlePathSelect('lowerOuterQuad')}
        />
        {/* Lower Inner Quad */}
        <path
          d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z"
          fill={selectedPath === 'lowerInnerQuad' ? currentColor : lowerInnerQuadColor}
          onClick={() => handlePathSelect('lowerInnerQuad')}
        />
      </svg>
      <div className='mt-4 flex gap-1 md:gap-4 items-center'>
      {/* Background Path Color Picker */}
        <label htmlFor="backgroundPathColorPicker" className="text-xs text-center text-white/40">
          Background Color
          <br/> 🌈
        </label>
        <input
          type="color"
          id="backgroundPathColorPicker"
          value={backgroundPathPickerColor}
          style={{ backgroundColor: backgroundPathPickerColor }}
          onChange={(e) => handleBackgroundPathColorChange(e.target.value)}
          className='w-16 px-2 py-2 text-xs border rounded bg-white/10 border-white/40 transition-transform transform hover:scale-105'
        />
        <div className="h-10 w-[0.2px] mx-2 bg-white/40"></div>     
        <label htmlFor="otherPathsColorPicker" className="text-xs text-center text-white/40">
          Other Paths Color 
          <br/>🌈
        </label>
        <input
          type="color"
          id="otherPathsColorPicker"
          value={otherPathsPickerColor}
          style={{ backgroundColor: otherPathsPickerColor }}
          onChange={(e) => handleOtherPathsColorChange(e.target.value)}
          className='w-16 px-2 py-2 text-xs border rounded bg-white/10 border-white/40 transition-transform transform hover:scale-105'
        />
      </div>


      {/* Download buttons */}
      <div className='flex items-center gap-4'>
        <button
          onClick={downloadSvg}
          className='w-auto px-2 py-2 mt-4 text-xs text-white border rounded bg-white/10 border-white/10 transition-transform transform hover:scale-105'
        >
          Download SVG
        </button>
        <button
          onClick={downloadPng}
          className='w-auto px-2 py-2 mt-4 text-xs text-white border rounded bg-white/10 border-white/10 transition-transform transform hover:scale-105'
        >
          Download PNG
        </button>
        <div>
          <a href="https://zora.co/create">
          <button
            className="flex items-center justify-center w-auto px-2 py-2 mt-4 space-x-2 text-xs text-white border rounded bg-white/10 border-white/10 transition-transform transform hover:scale-105"
          >
            <span className='mt-0.5'>
              <img className="w-[12px] bg-white/0" src={zorb} alt="Zorb" />
            </span>
            <span className='bg-white/0'>Mint on Zora</span>
          </button>
          </a>
        </div>
      </div>
      <div className='pt-4 text-s text-center text-[#800090]'>
        Created by <a href="https://twitter.com/0xSarthak13">Ayush Singh</a>
      </div>
    </div>
  );
};

export default Home;