import { nanoid } from 'nanoid'
import type { Slide, SlideBackground, PPTElement, PPTTextElement, PPTShapeElement } from '@/types/slides'

// 转换背景
export const convertBackground = (bgData: any): SlideBackground => {
  if (bgData.type === 'image' && bgData.image) {
    return {
      type: 'image',
      image: {
        src: bgData.image,
        size: bgData.imageSize || 'cover',
      },
    }
  }
  return {
    type: 'solid',
    color: bgData.themeColor?.color || '#ffffff',
  }
}

// 转换元素
export const convertElement = (elementData: any, themeValue: any): PPTElement | null => {
  if (elementData.type === 'text') {
    // 转换复杂的content结构为简单的HTML
    const htmlContent = convertContentToHTML(elementData.content)

    const textElement: PPTTextElement = {
      type: 'text',
      id: elementData.id || nanoid(10),
      left: elementData.left || 0,
      top: elementData.top || 0,
      width: elementData.width || 100,
      height: elementData.height || 50,
      content: htmlContent,
      rotate: elementData.rotate || 0,
      defaultFontName: elementData.defaultFontName || themeValue.fontName,
      defaultColor: elementData.defaultColor?.color || themeValue.fontColor,
      lineHeight: elementData.lineHeight || 1.2,
      wordSpace: elementData.wordSpace || 0,
      vertical: elementData.vertical || false,
    }

    return textElement
  }
  else if (elementData.type === 'shape') {
    const shapeElement: PPTShapeElement = {
      type: 'shape',
      id: elementData.id || nanoid(10),
      left: elementData.left || 0,
      top: elementData.top || 0,
      width: elementData.width || 100,
      height: elementData.height || 100,
      viewBox: elementData.viewBox || [200, 200],
      path: elementData.path || 'M 0 0 L 200 0 L 200 200 L 0 200 Z',
      fill: elementData.themeFill?.color || elementData.fill || '#5b9bd5',
      fixedRatio: elementData.fixedRatio || false,
      rotate: elementData.rotate || 0,
      opacity: elementData.opacity || 1,
      pathFormula: elementData.pathFormula,
      keypoints: elementData.keypoint ? [elementData.keypoint] : undefined,
      text: {
        content: '',
        defaultFontName: themeValue.fontName,
        defaultColor: themeValue.fontColor,
        align: 'middle',
      },
    }

    return shapeElement
  }

  return null
}

// 转换content结构为HTML
export const convertContentToHTML = (content: any[]): string => {
  if (!content || !Array.isArray(content)) return ''

  const processContent = (items: any[]): string => {
    return items.map(item => {
      if (item.type === 'div') {
        return `<div>${processContent(item.content || [])}</div>`
      }
      else if (item.type === 'p') {
        const style = item.style && item.style['text-align']
          ? ` style="text-align: ${item.style['text-align']}"`
          : ''
        return `<p${style}>${processContent(item.content || [])}</p>`
      }
      else if (item.type === 'span') {
        const styles = []
        if (item.style) {
          if (item.style.color) styles.push(`color: ${item.style.color}`)
          if (item.style['font-size']) styles.push(`font-size: ${item.style['font-size']}`)
          if (item.style['font-family']) styles.push(`font-family: ${item.style['font-family']}`)
          if (item.style['font-weight']) styles.push(`font-weight: ${item.style['font-weight']}`)
        }
        const styleAttr = styles.length > 0 ? ` style="${styles.join('; ')}"` : ''
        return `<span${styleAttr}>${item.text || ''}</span>`
      }
      return ''
    }).join('')
  }

  return processContent(content)
} 