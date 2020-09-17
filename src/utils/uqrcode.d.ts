/*
 * @Description: 
 * @Author: Steven
 * @Date: 2020-09-17 14:35:46
 * @LastEditors: Steven
 * @LastEditTime: 2020-09-17 14:51:09
 */

declare module uQRCode {
  export class QR8bitByte {
    getLength(buffer): number
    write(buffer): void
  }
  export class QRCode {
    addData(data): void
    isDark(row, col): any
    getModuleCount(): number
    make: () => void
    makeImpl: (test, maskPattern) => void
    setupPositionProbePattern: (row, col) => void
    getBestMaskPattern: () => number
    createMovieClip: (target_mc, instance_name, depth) => any
    setupTimingPattern: () => void
    setupTypeNumber: () => void
    setupTypeInfo: (test: any, maskPattern: any) => void
    mapData: (data: any, maskPattern: any) => void
    createData(typeNumber: any, errorCorrectLevel: any, dataList: any): any[]
    createBytes(buffer: any, rsBlocks: any): any[]
  }
}
