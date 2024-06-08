/* empty css                        */
import { A as AstroError, i as InvalidImageService, j as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, c as createAstro, d as createComponent, k as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, g as renderComponent, f as renderSlot, h as renderHead } from '../astro_ogGt8jf6.mjs';
import 'kleur/colors';
import { b as $$Icon } from './400_DChj4Xfz.mjs';
import { r as resolveSrc, i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_DNf6_4om.mjs';
import { clsx } from 'clsx';
/* empty css                              */
/* empty css                              */
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { cva } from 'class-variance-authority';
import { d as db, P as Projects } from './_projectId__hDyHbqSq.mjs';
import * as ProgressPrimitive from '@radix-ui/react-progress';
/* empty css                              */
import { count, eq } from '@astrojs/db/dist/runtime/virtual.js';

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_DNf6_4om.mjs'
    ).then(n => n.k).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$6 = createAstro("https://www.swifly.app");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "C:/Users/Sandra/Desktop/layout/node_modules/astro/components/Image.astro", void 0);

const $$Astro$5 = createAstro("https://www.swifly.app");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "C:/Users/Sandra/Desktop/layout/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Calendar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="calendar" class="bg-grape-100 p-4 border border-grape-300 rounded-lg h-fit flex flex-col justify-center items-center font-semibold text-grape-950 w-full shadow-md"> <div class="month w-full p-2 mt-2 rounded-full bg-grape-200"> <ul class="grid grid-cols-4 text-center"> <li id="prev" class="cursor-pointer flex items-center justify-center rounded-full hover:bg-grape-300 mx-1">
&#10094;
</li> <li id="month"></li> <li id="year"></li> <li id="next" class="cursor-pointer flex items-center justify-center rounded-full hover:bg-grape-300 mx-1">
&#10095;
</li> </ul> </div> <ul id="weekdays" class="bg-grape-200 rounded-xl p-2 text-center grid grid-cols-7 my-4 mx-2 w-full"> <li>L</li> <li>M</li> <li>X</li> <li>J</li> <li>V</li> <li>S</li> <li>D</li> </ul> <ul id="days" class="px-6 py-2 gap-4 grid grid-cols-7 w-full text-center bg-grape-200 rounded-xl"></ul> </div> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/Calendar.astro", void 0);

const $$Astro$4 = createAstro("https://www.swifly.app");
const $$Modal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Modal;
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`openModalButton ${Astro2.props.extra}`, "class")} data-astro-cid-qmzm2soj>${renderComponent($$result, "Icon", $$Icon, { "icon": Astro2.props.btn, "size": Astro2.props.size, "data-astro-cid-qmzm2soj": true })}</button> <div class="bgModal modalToggle fixed z-40 top-0 left-0 h-screen w-screen flex items-center justify-center" data-astro-cid-qmzm2soj> <dialog class="modalContent modalToggle z-50 w-full max-w-4xl rounded-xl relative top-10" data-astro-cid-qmzm2soj> <div class="flex bg-white rounded-xl border h-fit min-h-2xl flex-col items-center justify-start p-12" data-astro-cid-qmzm2soj> <div class="title flex flex-row w-full justify-between items-center" data-astro-cid-qmzm2soj> <h4 class="text-lg font-semibold text-grape-900 w-full border-b border-b-gray-200" data-astro-cid-qmzm2soj> ${Astro2.props.title} </h4> <div class="close mx-1 text-red-500 hover:text-red-700 bg-red-100 rounded-full cursor-pointer" data-astro-cid-qmzm2soj> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1.2em", "data-astro-cid-qmzm2soj": true })} </div> </div> ${renderSlot($$result, $$slots["children"])} </div> </dialog> </div>  `;
}, "C:/Users/Sandra/Desktop/layout/src/components/Modal.astro", void 0);

const $$Astro$3 = createAstro("https://www.swifly.app");
const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Menu;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(Astro2.props.clase, "class")}> <div class="relative inline-block text-left"> <div> ${// custom button for dropdown menu if needed
  Astro2.props.useCustomButton ? renderTemplate`${renderSlot($$result, $$slots["button"])}` : (
    // else go for default
    renderTemplate`<button type="button" class="dropdown-menu inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-grape-950 shadow-sm ring-1 ring-inset ring-grape-900 hover:bg-grape-100" id="menu-button" aria-expanded="true" aria-haspopup="true"> ${renderComponent($$result, "Icon", $$Icon, { "icon": Astro2.props.icon, "size": "1.5em" })} <h4 class="sr-only" aria-label="Icono"> ${Astro2.props.srtitle} </h4> </button>`
  )} </div> <div class="dropdown-content notification-menu hidden absolute -right-36 z-10 mt-2 max-h-96 w-[400px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"> <div class="notification-header flex flex-row justify-center items-center"> ${renderComponent($$result, "Icon", $$Icon, { "icon": Astro2.props.icon, "size": "1.4em" })} <h5 class="text-xl p-6 text-grape-900 font-semibold not-sr-only"> ${Astro2.props.title} </h5> </div> ${renderSlot($$result, $$slots["children"])} </div> </div> </div> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/Menu.astro", void 0);

const $$Astro$2 = createAstro("https://www.swifly.app");
const $$DashboardNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DashboardNav;
  const user = Astro2.locals.user;
  JSON.stringify(user, null, 2);
  user.id;
  return renderTemplate`${maybeRenderHead()}<div class="nav-wrapper fixed top-0 z-40 w-full bg-white-500 flex flex-row justify-center items-center bg-white border-b border-b-gray-300 shadow-xs"> <header class="flex justify-between items-center w-full max-w-7xl bg-white"> <div class="section flex justify-start items-start flex-col w-full"> <div class="logo flex flex-row justify-center items-center cursor-pointer h-12 w-12 my-3 bg-grape-950 shadow-inner border border-grape-300 text-grape-300 hover:bg-opacity-95 rounded-lg"> <a href="/dashboard" aria-label="swifly"> ${renderComponent($$result, "Icon", $$Icon, { "icon": "swifly", "size": "2.3em" })} </a> <h1 class="mx-2 sr-only">Swifly</h1> </div> </div> <nav class="text-grape-950 flex flex-row items-center justify-center"> <ul class="flex flex-row items-center justify-center gap-1"> <li class="inline-flex cursor-pointer w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-grape-950 shadow-sm ring-1 ring-inset ring-grape-900 hover:bg-grape-100 hover:ring-grape-900"> <a${addAttribute(`/my-projects`, "href")}> ${renderComponent($$result, "Icon", $$Icon, { "icon": "bookmark", "size": "1.5em", "aria-label": "Mis proyectos" })} <h5 class="sr-only">Mis proyectos</h5> </a> </li> <li> ${renderComponent($$result, "Modal", $$Modal, { "extra": "rounded-md bg-white px-3 py-2 text-sm font-semibold text-grape-950 shadow-sm ring-1 ring-inset ring-grape-900 hover:bg-grape-100", "btn": "plus", "size": "1.5em", "title": "Crear un proyecto nuevo", "class": "create" }, { "children": ($$result2) => renderTemplate`<div class="w-full"> <div class="create-wrapper w-full flex flex-row items-center justify-start"> <form action="/api/createProject" method="post" class="flex flex-col justify-center items-start
                      w-full gap-2"> <div class="inputs flex flex-col w-full gap-4 py-8 text-grape-950"> <label for="project-title" class="font-semibold text-leading">Título del proyecto</label> <input type="text" name="project-title" id="project-title" class="px-8 py-2 rounded-lg bg-grape-100 border border-grape-200" placeholder="Título" required> <label for="project-description" class="font-semibold text-leading">Descripción</label> <textarea rows="4" cols="50" name="project-description" id="project-description" class="px-8 py-2 rounded-lg bg-grape-100 border border-grape-200 h-32" placeholder="Descripción del proyecto" required></textarea> <input type="submit" value="Crear" class="w-1/2 self-center mt-2 p-2 cursor-pointer hover:bg-grape-400 hover:text-grape-900 bg-grape-300 text-lg border border-grape-800 text-grape-800 rounded-xl"> </div> </form> </div> </div>` })} </li> <li> ${renderComponent($$result, "Menu", $$Menu, { "clase": "search-menu dropdown", "icon": "search", "sr-title": "Buscador", "title": "Buscar" }, { "children": ($$result2) => renderTemplate`<div class="flex flex-row h-24 justify-center items-center"> <div class="search-wrapper w-full"> <form action="/search" method="get" class="flex flex-row w-full items-center justify-center gap-2"> <div class="relative left-9 top-0.5 text-gray-400"> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "search", "size": "0.8em" })} </div> <input class="text-left rounded-lg placeholder:text-sm placeholder:text-slate-400 h-10 w-[70%] px-9 bg-gray-100 shadow-inner focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1" type="text" name="q" placeholder="¿Qué estás buscando?"> <button class="hover:bg-grape-100 rounded-full"> ${renderComponent($$result2, "Icon", $$Icon, { "icon": "send", "size": "1.3em" })} </button> </form> </div> </div>` })} </li> <li> ${renderComponent($$result, "Menu", $$Menu, { "clase": "notification-menu dropdown", "icon": "bell", "sr-title": "Notificaciones", "title": "Notificaciones" }, { "children": ($$result2) => renderTemplate`<div> <div class="user-notification m-4 text-gray-500 flex flex-row justify-center items-center gap-2"> <div class="notification-pfp border border-gray-300 bg-gray-300 rounded-full size-8 overflow-hidden"> <img class="image object-cover" src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"> </div> <div class="text text-xs flex flex-row gap-1 justify-center items-center"> <strong>Usuario</strong><p>
te ha invitado a su proyecto. Pulsa para ver más.
</p> </div> </div> <div class="py-1 divide-y divide-gray-100" role="none"> <div class="user-notification m-4 text-gray-500 flex flex-row justify-center items-center gap-2"> <div class="notification-pfp border border-gray-300 bg-gray-300 rounded-full size-8 overflow-hidden"> <img class="image object-cover" src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"> </div> <div class="text text-xs flex flex-row gap-1 justify-center items-center"> <strong>Usuario</strong><p>
te ha invitado a su proyecto. Pulsa para ver más.
</p> </div> </div> </div> <div class="notification-utils py-1 divide-y divide-gray-100" role="none"> <div class="utils m-4 text-grape-800 flex flex-row justify-center items-center gap-2"> <div class="flex flex-row w-full justify-between items-start text-sm"> <strong>Limpiar notificaciones</strong> <strong>Ver todo</strong> </div> </div> </div> </div>` })} </li> <li class="inline-flex cursor-pointer w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-grape-950 shadow-sm ring-1 ring-inset ring-grape-900 hover:bg-grape-100"> <a href="/settings"> ${renderComponent($$result, "Icon", $$Icon, { "icon": "config", "size": "1.5em", "aria-label": "Ajustes" })} <h5 class="sr-only">Ajustes</h5> </a> </li> ${user && renderTemplate`<li id="logout" class="inline-flex cursor-pointer w-full  items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-grape-950 shadow-sm ring-1 ring-inset ring-grape-900 hover:bg-red-100 hover:ring-red-900 hover:text-red-900"> <form action="/api/signout" method="POST" class="flex justify-center items-center"> <button> ${renderComponent($$result, "Icon", $$Icon, { "icon": "signout", "size": "1.5em", "aria-label": "Cerrar sesi\xF3n" })} </button> <h5 class="sr-only">Cerrar sesión</h5> </form> </li>`} <li class="avatar ml-2"> ${renderComponent($$result, "Menu", $$Menu, { "clase": "notification-menu dropdown", "sr-title": `Perfil de ${user.username}`, "title": `Perfil de ${user.username}`, "useCustomButton": true }, { "button": ($$result2) => renderTemplate`<div class="profile w-full flex flex-col justify-center items-center relative"> <div class="pfp rounded-full border border-gray-200 overflow-hidden size-12 text-sm shadow-lg cursor-pointer hover:opacity-90"> ${renderComponent($$result2, "Image", $$Image, { "src": "https://i.imgur.com/GQ4cquU.png", "alt": "Foto de perfil personal", "width": "50", "height": "50", "loading": "eager", "class": "object-cover size-full" })} </div> <div class="status status-online rounded-full size-3 shadow-inner bg-green-600 absolute top-9 left-8 border border-green-200 me-5"> <span class="sr-only">Usuario en línea</span> </div> <div class="animate-ping-slow absolute top-[37px] left-[33px] p-[5px] rounded-full bg-green-600 opacity-75"></div> </div>`, "children": ($$result2) => renderTemplate`<div> <div class="user-menu text-gray-500 flex flex-row justify-center items-center gap-2"> <div class="sec flex w-full flex-col items-start justify-center text-gray-600 divide-y divide-y-gray-900"> <div class="w-full p-4 hover:bg-gray-50 text-sm cursor-pointer">
Cambiar contraseña
</div> </div> </div> </div>` })} </li> </ul> </nav> </header> </div>`;
}, "C:/Users/Sandra/Desktop/layout/src/components/DashboardNav.astro", void 0);

const $$Astro$1 = createAstro("https://www.swifly.app");
const $$HeadDashboard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HeadDashboard;
  const {
    title = "Swifly | ",
    description = "Gesti\xF3n de proyectos colaborativos y en equipo"
  } = Astro2.props;
  return renderTemplate`<head><meta charset="UTF-8"><meta name="description" property="og:description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} ${Astro2.props.subtitle}</title><link rel="icon" type="image/svg+xml" href="/swifly.svg">${renderHead()}</head>`;
}, "C:/Users/Sandra/Desktop/layout/src/components/HeadDashboard.astro", void 0);

const $$FooterDashboard = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-12" data-astro-cid-j5ehnt6k> <div class="group" data-astro-cid-j5ehnt6k> <p data-astro-cid-j5ehnt6k>&copy; ${currentYear} Swifly</p> </div> <p class="privacy flex flex-row gap-8" data-astro-cid-j5ehnt6k> <a href="/privacy" data-astro-cid-j5ehnt6k> Política de privacidad</a> <a href="/cookies" data-astro-cid-j5ehnt6k> Política de cookies</a> <a href="/contact" data-astro-cid-j5ehnt6k> Contacta con nosotros</a> </p> <p class="socials" data-astro-cid-j5ehnt6k> <a href="https://github.com/santvaz" data-astro-cid-j5ehnt6k>GitHub</a> </p> </footer> `;
}, "C:/Users/Sandra/Desktop/layout/src/components/FooterDashboard.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Breadcrumb = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "ol",
  {
    ref,
    className: cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-500 sm:gap-2.5 dark:text-gray-400",
      className
    ),
    ...props
  }
));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "li",
  {
    ref,
    className: cn("inline-flex items-center gap-1.5", className),
    ...props
  }
));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      className: cn("transition-colors hover:text-gray-950 dark:hover:text-gray-50", className),
      ...props
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "span",
  {
    ref,
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-gray-950 dark:text-gray-50", className),
    ...props
  }
));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

function WrappedBreadcrumb({ href, name, children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "breadcrumbs max-w-[91%] w-full p-4 mt-24 bg-white rounded-lg border border-gray-300 justify-start items-start xl:max-w-7xl",
      children: /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
        /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbLink, { href, children: name }) }),
        /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
        children
      ] }) })
    }
  ) });
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
        outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-gray-500 dark:text-gray-400", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

function Component$1() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-4 items-center justify-center p-6 sm:p-8 divide-y divide-gray-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 w-full", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-light", children: "Próximamente" }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "w-5 h-5" }),
        "Añadir evento"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 py-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "shadow-md bg-grape-50 border border-grape-300", children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-grape-900", children: "Presentación trabajo de fin de ciclo" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs", children: "Junio 10, 2024" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs", children: "15:00 PM - 9:30 PM" })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "shadow-md bg-grape-50 border border-grape-300", children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-grape-900", children: "Completar mis tareas del proyecto de Laura" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs", children: "Junio 17, 2024" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs", children: "08:00 AM - 2:30 PM" })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "shadow-md bg-grape-50 border border-grape-300", children: /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-4 gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "text-lg font-medium text-grape-900", children: "Fin de prácticas" }),
          /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs", children: "Junio 24, 2024" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-xs", children: "12:00 PM - 1:30 PM" })
      ] }) })
    ] })
  ] });
}
function PlusIcon(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M5 12h14" }),
        /* @__PURE__ */ jsx("path", { d: "M12 5v14" })
      ]
    }
  );
}

const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-gray-900 transition-all dark:bg-gray-50",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;

function Component() {
  return /* @__PURE__ */ jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "flex items-center justify-between" }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500  mb-2", children: "Tareas completadas" }),
        /* @__PURE__ */ jsx(Progress, { value: 33 }),
        /* @__PURE__ */ jsx("div", { className: "text-right text-sm font-medium", children: "33%" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 mb-2", children: "Tareas pendientes" }),
        /* @__PURE__ */ jsx(Progress, { value: 67 }),
        /* @__PURE__ */ jsx("div", { className: "text-right text-sm font-medium", children: "67%" })
      ] })
    ] }) })
  ] });
}

const $$Astro = createAstro("https://www.swifly.app");
const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/");
  }
  const projectCount = await db.select({
    count: count(Projects.id)
  }).from(Projects).where(eq(Projects.user_creator, user.id));
  return renderTemplate`<html lang="es" data-astro-cid-3nssi2tu> <!-- head --> ${renderComponent($$result, "HeadDashboard", $$HeadDashboard, { "subtitle": "Dashboard", "data-astro-cid-3nssi2tu": true })}${maybeRenderHead()}<body class="bg-gray-100 flex flex-col justify-center items-center w-full gap-4" data-astro-cid-3nssi2tu> <!-- dashboard navigation bar --> ${renderComponent($$result, "DashboardNav", $$DashboardNav, { "data-astro-cid-3nssi2tu": true })} <!-- page content --> <div class="md:p-0 flex flex-col gap-4 justify-center items-center w-full" data-astro-cid-3nssi2tu> ${renderComponent($$result, "WrappedBreadcrumb", WrappedBreadcrumb, { "href": "/", "name": "Dashboard", "data-astro-cid-3nssi2tu": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BreadcrumbItem", BreadcrumbItem, { "data-astro-cid-3nssi2tu": true }, { "default": ($$result3) => renderTemplate` <div class="active" data-astro-cid-3nssi2tu> ${renderComponent($$result3, "BreadcrumbLink", BreadcrumbLink, { "href": "/my-projects", "data-astro-cid-3nssi2tu": true }, { "default": ($$result4) => renderTemplate`Mis proyectos` })} </div> ` })} ` })} </div> <div class="content p-8 md:p-0 flex flex-col xl:flex-row gap-4 justify-between items-start max-w-7xl" data-astro-cid-3nssi2tu> <!-- main --> <main class="w-full max-w-4xl flex flex-col gap-2 justify-start items-start bg-white-200 p-10 rounded-lg bg-white border border-gray-300 shadow-sm" data-astro-cid-3nssi2tu> <h2 class="font-light text-4xl not-sr-only flex flex-row justify-center items-center gap-2 p-4 rounded-xl" data-astro-cid-3nssi2tu>
¡Hola,<span class="font-medium text-plum-800" data-astro-cid-3nssi2tu>${user.username}</span>! <span class="text-2xl mt-1" data-astro-cid-3nssi2tu>👋🏼</span> </h2> <hr class="h-px w-full text-gray-400 my-1" data-astro-cid-3nssi2tu> <h4 class="text-base font-thin" data-astro-cid-3nssi2tu>Resumen de tu cuenta:</h4> <section class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-3nssi2tu> <div class="w-full flex items-center justify-center bg-indigo-100 border border-indigo-300 rounded-xl px-4 py-2 text-indigo-700" data-astro-cid-3nssi2tu> ${projectCount.map((count2) => renderTemplate`<p class="w-full" data-astro-cid-3nssi2tu>
Estás trabajando en ${count2.count} proyectos
</p>`)} </div> <div class="w-full flex items-center justify-center bg-emerald-100 border border-emerald-300 rounded-xl px-4 py-2 text-emerald-700" data-astro-cid-3nssi2tu> <p class="w-full" data-astro-cid-3nssi2tu>
¡Genial! 😊 Estás colaborando con otros usuarios en ${Math.floor(Math.random() * 10)} proyectos
</p> </div> <div class="w-full flex items-center justify-center bg-cyan-100 border border-cyan-300 rounded-xl px-4 py-2 text-cyan-700" data-astro-cid-3nssi2tu> <p class="w-full" data-astro-cid-3nssi2tu>
Tienes ${Math.floor(Math.random() * 5)} invitaciones a proyectos pendientes
</p> </div> <div class="w-full flex items-center justify-center bg-yellow-100 border border-yellow-300 rounded-xl px-4 py-2 text-yellow-700" data-astro-cid-3nssi2tu> <p class="w-full" data-astro-cid-3nssi2tu>
Tienes ${Math.floor(Math.random() * 15)} mensajes privados sin leer
</p> </div> <div class="w-full flex items-center justify-center bg-rose-100 border border-rose-300 rounded-xl px-4 py-2 text-rose-700" data-astro-cid-3nssi2tu> <p class="w-full" data-astro-cid-3nssi2tu>
Tienes ${Math.floor(Math.random() * 8)} solicitudes de amistad pendientes
</p> </div> <div class="w-full flex items-center justify-center bg-orange-100 border border-orange-300 rounded-xl px-4 py-2 text-orange-700" data-astro-cid-3nssi2tu> <p class="w-full" data-astro-cid-3nssi2tu>
Tienes ${Math.floor(Math.random() * 20)} amigos conectados ahora mismo
</p> </div> </section> <section class="calendar-wrapper w-full flex flex-col gap-4 justify-center items-start" data-astro-cid-3nssi2tu> <h2 class="text-grape-800 not-sr-only font-semibold text-2xl" data-astro-cid-3nssi2tu>
Calendario
</h2> <hr class="h-px w-full text-gray-400 my-4 mb-4" data-astro-cid-3nssi2tu> <div class="w-full max-w-sm mx-auto" data-astro-cid-3nssi2tu> <!-- calendar component --> ${renderComponent($$result, "Calendar", $$Calendar, { "data-astro-cid-3nssi2tu": true })} </div> </section> <section class="bg-white flex flex-col justify-center items-start w-full" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Events", Component$1, { "data-astro-cid-3nssi2tu": true })} </section> <!-- end main tag --> </main> <!-- aside --> <aside class="flex flex-col gap-4 w-full" data-astro-cid-3nssi2tu> <section class="bg-white flex flex-col justify-center items-start p-12 w-full rounded-xl border border-gray-300" data-astro-cid-3nssi2tu> <div class="chat-title w-full flex flex-row justify-between items-center text-grape-800" data-astro-cid-3nssi2tu> <h2 class="text-grape-800 font-semibold text-2xl not-sr-only" data-astro-cid-3nssi2tu>
Mensajes
</h2> <div class="add-chat cursor-pointer" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Modal", $$Modal, { "extra": "px-4 py-2 bg-grape-50 text-grape-800 border border-grape-700 rounded-lg", "btn": "plus", "size": "1.2em", "title": "Mandar un mensaje privado", "data-astro-cid-3nssi2tu": true }, { "children": ($$result2) => renderTemplate`<div class="w-full mt-4" data-astro-cid-3nssi2tu> <form action="" method="post" class="flex flex-col justify-center items-start w-full" data-astro-cid-3nssi2tu> <div class="inputs flex flex-col w-full gap-4 text-grape-950" data-astro-cid-3nssi2tu> <label for="search-user" class="font-semibold text-leading" data-astro-cid-3nssi2tu>Buscar por nombre de usuario</label> <input type="text" name="search-user" id="search-user" class="px-8 py-2 rounded-lg bg-grape-100 border border-grape-200 shadow-inner" placeholder="Nombre de usuario" data-astro-cid-3nssi2tu> <input type="submit" value="Buscar" aria-label="Buscar por nombre de usuario" class="w-1/2 not-sr-only self-center mt-2 p-2 cursor-pointer hover:bg-grape-400 hover:text-grape-900 bg-grape-300 text-lg border border-grape-800 text-grape-800 rounded-xl" data-astro-cid-3nssi2tu> </div> </form> </div>` })} </div> </div> <hr class="h-px w-full text-gray-400 my-4 mb-4" data-astro-cid-3nssi2tu> <div class="aside-wrapper w-full" data-astro-cid-3nssi2tu> <div class="chat-messages flex h-96 w-full" data-astro-cid-3nssi2tu> <div class="chat flex flex-col justify-start items-center w-full overflow-auto divide-y divide-gray-200" data-astro-cid-3nssi2tu> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>jgomez</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>wayne333</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1569913486515-b74bf7751574?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>luchiao</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1567704971014-a42cbd8acf38?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>nicole.wal</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>pookie</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1568642181406-62729499a9b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>mariona-casas</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> <div class="chat-section-wrapper p-2 flex flex-col justify-center w-full items-start hover:bg-gray-50 cursor-pointer text-grape-950" data-astro-cid-3nssi2tu> <div class="chat-user-wrapper w-full flex flex-row justify-between items-center gap-2" data-astro-cid-3nssi2tu> <div class="flex flex-row justify-center items-center gap-6" data-astro-cid-3nssi2tu> <div class="chat-pfp rounded-full size-10 bg-gray-300 overflow-hidden shadow-md border border-gray-300" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1591197415080-d849883ecb27?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "alt": "Foto de perfil", "width": "100", "height": "100", "loading": "eager", "class": "object-cover size-full", "data-astro-cid-3nssi2tu": true })} </div> <h5 class="font-semibold text-sm" data-astro-cid-3nssi2tu>rosarafael</h5> </div> <div class="delete flex justify-self-end text-red-600 hover:text-red-700" aria-label="Cerrar conversación" data-astro-cid-3nssi2tu> ${renderComponent($$result, "Icon", $$Icon, { "icon": "close", "size": "1em", "data-astro-cid-3nssi2tu": true })} </div> </div> </div> </div> </div> </div> </section> <section class="bg-white flex flex-col justify-center items-start p-12 w-full rounded-xl border border-gray-300 gap-4" data-astro-cid-3nssi2tu> <h4 class="font-thin text-2xl" data-astro-cid-3nssi2tu>Tu progreso</h4> <hr class="h-px w-full text-gray-400 my-1" data-astro-cid-3nssi2tu> ${renderComponent($$result, "TaskProgress", Component, { "data-astro-cid-3nssi2tu": true })} </section> </aside> <!-- end aside tag --> </div> <!-- footer --> ${renderComponent($$result, "FooterDashboard", $$FooterDashboard, { "data-astro-cid-3nssi2tu": true })} <!-- end footer tag -->  </body> </html>`;
}, "C:/Users/Sandra/Desktop/layout/src/pages/dashboard.astro", void 0);

const $$file = "C:/Users/Sandra/Desktop/layout/src/pages/dashboard.astro";
const $$url = "/dashboard";

const dashboard = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$HeadDashboard as $, BreadcrumbItem as B, WrappedBreadcrumb as W, $$DashboardNav as a, BreadcrumbLink as b, $$FooterDashboard as c, $$Menu as d, $$Modal as e, $$Image as f, getConfiguredImageService as g, BreadcrumbSeparator as h, imageConfig as i, dashboard as j };
