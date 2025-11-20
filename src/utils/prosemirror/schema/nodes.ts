import { nodes } from 'prosemirror-schema-basic'
import type { Node, NodeSpec } from 'prosemirror-model'
import { listItem as _listItem } from 'prosemirror-schema-list'
import { getFAUnicode } from '@/utils/fontawesome'

interface Attr {
  [key: string]: number | string
}

const orderedList: NodeSpec = {
  attrs: {
    order: {
      default: 1,
    },
    listStyleType: {
      default: '',
    },
    fontsize: {
      default: '',
    },
    color: {
      default: '',
    },
  },
  content: 'list_item+',
  group: 'block',
  parseDOM: [
    { 
      tag: 'ol', 
      getAttrs: dom => {
        const order = ((dom as HTMLElement).hasAttribute('start') ? (dom as HTMLElement).getAttribute('start') : 1) || 1
        const attr: Attr = { order: +order }

        const { listStyleType, fontSize, color } = (dom as HTMLElement).style
        if (listStyleType) attr['listStyleType'] = listStyleType
        if (fontSize) attr['fontsize'] = fontSize
        if (color) attr['color'] = color

        return attr
      }
    }
  ],
  toDOM: (node: Node) => {
    const { order, listStyleType, fontsize, color } = node.attrs
    let style = ''
    if (listStyleType) style += `list-style-type: ${listStyleType};`
    if (fontsize) style += `font-size: ${fontsize};`
    if (color) style += `color: ${color};`

    const attr: Attr = { style }
    if (order !== 1) attr['start'] = order


    return ['ol', attr, 0]
  },
}

const bulletList: NodeSpec = {
  attrs: {
    listStyleType: {
      default: '',
    },
    customBullet: {
      default: '',  // 自定义符号字符
    },
    bulletFont: {
      default: '',  // 符号字体（如 'Unicode'）
    },
    fontsize: {
      default: '',
    },
    color: {
      default: '',
    },
  },
  content: 'list_item+',
  group: 'block',
  parseDOM: [
    {
      tag: 'ul',
      getAttrs: dom => {
        const attr: Attr = {}

        const { listStyleType, fontSize, color } = (dom as HTMLElement).style
        if (listStyleType) attr['listStyleType'] = listStyleType
        if (fontSize) attr['fontsize'] = fontSize
        if (color) attr['color'] = color

        // 解析自定义符号属性
        const customBullet = (dom as HTMLElement).getAttribute('data-custom-bullet')
        const bulletChar = (dom as HTMLElement).getAttribute('data-bullet-char')
        const bulletFont = (dom as HTMLElement).getAttribute('data-bullet-font')
        const fontawesomeBullet = (dom as HTMLElement).getAttribute('data-fontawesome-bullet')
        const faIconClass = (dom as HTMLElement).getAttribute('data-fa-icon-class')

        if (customBullet === 'true' && bulletChar) {
          attr['customBullet'] = bulletChar
          if (bulletFont) attr['bulletFont'] = bulletFont
        } else if (fontawesomeBullet === 'true' && faIconClass) {
          attr['customBullet'] = faIconClass
          attr['bulletFont'] = 'fontawesome'
        }

        return attr
      }
    }
  ],
  toDOM: (node: Node) => {
    const { listStyleType, fontsize, color, customBullet, bulletFont } = node.attrs
    let style = ''
    const attrs: Attr = {}

    if (customBullet) {
      style += `list-style-type: none;`

      if (bulletFont === 'fontawesome') {
        // Font Awesome 图标
        const faMapping = getFAUnicode(customBullet)
        attrs['data-fontawesome-bullet'] = 'true'
        attrs['data-fa-icon-class'] = customBullet
        style += `--bullet-icon: '${faMapping.unicode}';`
        style += `--fa-font-weight: ${faMapping.weight};`
      } else {
        // Unicode 自定义符号
        attrs['data-custom-bullet'] = 'true'
        attrs['data-bullet-char'] = customBullet
        if (bulletFont) {
          attrs['data-bullet-font'] = bulletFont
          style += `--bullet-font: ${bulletFont};`
        }
        style += `--bullet-content: '${customBullet}';`
      }
    } else if (listStyleType) {
      style += `list-style-type: ${listStyleType};`
    }

    if (fontsize) style += `font-size: ${fontsize};`
    if (color) {
      style += `color: ${color};`
      style += `--bullet-color: ${color};`
    }

    attrs.style = style

    return ['ul', attrs, 0]
  },
}

const listItem: NodeSpec = {
  ..._listItem,
  content: 'paragraph block*',
  group: 'block',
}

const paragraph: NodeSpec = {
  attrs: {
    align: {
      default: '',
    },
    indent: {
      default: 0,
    },
    textIndent: {
      default: 0,
    },
  },
  content: 'inline*',
  group: 'block',
  parseDOM: [
    {
      tag: 'p',
      getAttrs: dom => {
        const { textAlign, textIndent } = (dom as HTMLElement).style

        let align = (dom as HTMLElement).getAttribute('align') || textAlign || ''
        align = /(left|right|center|justify)/.test(align) ? align : ''

        let textIndentLevel = 0
        if (textIndent) {
          if (/em/.test(textIndent)) {
            textIndentLevel = parseInt(textIndent)
          }
          else if (/px/.test(textIndent)) {
            textIndentLevel = Math.floor(parseInt(textIndent) / 16)
            if (!textIndentLevel) textIndentLevel = 1
          }
        }

        const indent = +((dom as HTMLElement).getAttribute('data-indent') || 0)
      
        return { align, indent, textIndent: textIndentLevel }
      }
    },
    {
      tag: 'img',
      ignore: true,
    },
    {
      tag: 'pre',
      skip: true,
    },
  ],
  toDOM: (node: Node) => {
    const { align, indent, textIndent } = node.attrs
    let style = ''
    if (align && align !== 'left') style += `text-align: ${align};`
    if (textIndent) style += `text-indent: ${textIndent}em;`

    const attr: Attr = { style }
    if (indent) attr['data-indent'] = indent

    return ['p', attr, 0]
  },
}

const {
  doc,
  blockquote,
  text,
} = nodes

export default {
  doc,
  paragraph,
  blockquote,
  text,
  'ordered_list': orderedList,
  'bullet_list': bulletList,
  'list_item': listItem,
}
