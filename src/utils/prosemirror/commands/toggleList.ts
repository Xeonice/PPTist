import { wrapInList, liftListItem } from 'prosemirror-schema-list'
import type { Node, NodeType } from 'prosemirror-model'
import type { Transaction, EditorState } from 'prosemirror-state'
import { findParentNode, isList } from '../utils'

interface Attr {
  [key: string]: number | string
}

interface TextStyleAttr {
  color?: string
  fontsize?: string
}

export interface CustomBulletConfig {
  type: 'custom'
  char: string
  font?: string
}

export interface FontAwesomeConfig {
  type: 'fontawesome'
  class: string
  font: 'Font Awesome'
}

export const toggleList = (
  listType: NodeType,
  itemType: NodeType,
  listStyleType: string | CustomBulletConfig | FontAwesomeConfig,
  textStyleAttr: TextStyleAttr = {}
) => {
  return (state: EditorState, dispatch: (tr: Transaction) => void) => {
    // 解析特殊格式的字符串
    let parsedListStyleType = listStyleType

    if (typeof listStyleType === 'string') {
      if (listStyleType.startsWith('unicode:')) {
        const parts = listStyleType.split(':')
        parsedListStyleType = {
          type: 'custom',
          char: parts[1] || '',
          font: parts[2] || ''
        }
      } else if (listStyleType.startsWith('fontawesome:')) {
        const iconClass = listStyleType.substring('fontawesome:'.length)
        parsedListStyleType = {
          type: 'fontawesome',
          class: iconClass,
          font: 'Font Awesome'
        }
      }
      // 其他普通字符串保持原样
    }

    const { schema, selection } = state
    const { $from, $to } = selection
    const range = $from.blockRange($to)

    if (!range) return false

    const parentList = findParentNode((node: Node) => isList(node, schema))(selection)

    if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
      // 如果当前已经是该类型的列表且没有样式，则取消列表
      if (parentList.node.type === listType && !parsedListStyleType) {
        return liftListItem(itemType)(state, dispatch)
      }

      if (isList(parentList.node, schema) && listType.validContent(parentList.node.content)) {
        const { tr } = state

        const nodeAttrs: Attr = {
          ...parentList.node.attrs,
          ...textStyleAttr,
        }

        // 处理自定义项目符号
        if (typeof parsedListStyleType === 'object' && parsedListStyleType.type === 'custom') {
          nodeAttrs.customBullet = parsedListStyleType.char
          nodeAttrs.bulletFont = parsedListStyleType.font || ''
          nodeAttrs.listStyleType = 'none'
        } else if (typeof parsedListStyleType === 'object' && parsedListStyleType.type === 'fontawesome') {
          nodeAttrs.customBullet = parsedListStyleType.class
          nodeAttrs.bulletFont = 'fontawesome'
          nodeAttrs.listStyleType = 'none'
        } else {
          nodeAttrs.listStyleType = parsedListStyleType
          nodeAttrs.customBullet = ''
          nodeAttrs.bulletFont = ''
        }

        tr.setNodeMarkup(parentList.pos, listType, nodeAttrs)

        if (dispatch) dispatch(tr)

        return false
      }
    }

    const nodeAttrs: Attr = {
      ...textStyleAttr,
    }

    // 处理自定义项目符号
    if (typeof parsedListStyleType === 'object' && parsedListStyleType.type === 'custom') {
      nodeAttrs.customBullet = parsedListStyleType.char
      nodeAttrs.bulletFont = parsedListStyleType.font || ''
      nodeAttrs.listStyleType = 'none'
    } else if (typeof parsedListStyleType === 'object' && parsedListStyleType.type === 'fontawesome') {
      nodeAttrs.customBullet = parsedListStyleType.class
      nodeAttrs.bulletFont = 'fontawesome'
      nodeAttrs.listStyleType = 'none'
    } else {
      nodeAttrs.listStyleType = parsedListStyleType
      nodeAttrs.customBullet = ''
      nodeAttrs.bulletFont = ''
    }

    return wrapInList(listType, nodeAttrs)(state, dispatch)
  }
}