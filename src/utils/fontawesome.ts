// Font Awesome 图标类名到 Unicode 码点的映射
// 基于 Font Awesome Free 7.x 版本

export const FA_ICON_MAP: Record<string, { unicode: string; weight: string }> = {
  // Solid 图标 (weight: 900)
  'fas fa-check': { unicode: '\uf00c', weight: '900' },
  'fas fa-times': { unicode: '\uf00d', weight: '900' },
  'fas fa-star': { unicode: '\uf005', weight: '900' },
  'fas fa-heart': { unicode: '\uf004', weight: '900' },
  'fas fa-circle': { unicode: '\uf111', weight: '900' },
  'fas fa-square': { unicode: '\uf0c8', weight: '900' },
  'fas fa-dot-circle': { unicode: '\uf192', weight: '900' },
  'fas fa-plus': { unicode: '\uf067', weight: '900' },
  'fas fa-minus': { unicode: '\uf068', weight: '900' },
  'fas fa-play': { unicode: '\uf04b', weight: '900' },

  // 箭头类
  'fas fa-arrow-right': { unicode: '\uf061', weight: '900' },
  'fas fa-arrow-left': { unicode: '\uf060', weight: '900' },
  'fas fa-arrow-up': { unicode: '\uf062', weight: '900' },
  'fas fa-arrow-down': { unicode: '\uf063', weight: '900' },
  'fas fa-chevron-right': { unicode: '\uf054', weight: '900' },
  'fas fa-chevron-left': { unicode: '\uf053', weight: '900' },
  'fas fa-caret-right': { unicode: '\uf0da', weight: '900' },
  'fas fa-caret-left': { unicode: '\uf0d9', weight: '900' },
  'fas fa-angle-right': { unicode: '\uf105', weight: '900' },
  'fas fa-angle-left': { unicode: '\uf104', weight: '900' },

  // 图标符号
  'fas fa-tag': { unicode: '\uf02b', weight: '900' },
  'fas fa-bookmark': { unicode: '\uf02e', weight: '900' },
  'fas fa-flag': { unicode: '\uf024', weight: '900' },
  'fas fa-thumbtack': { unicode: '\uf08d', weight: '900' },
  'fas fa-paperclip': { unicode: '\uf0c6', weight: '900' },
  'fas fa-bell': { unicode: '\uf0f3', weight: '900' },
  'fas fa-lightbulb': { unicode: '\uf0eb', weight: '900' },
  'fas fa-key': { unicode: '\uf084', weight: '900' },
  'fas fa-lock': { unicode: '\uf023', weight: '900' },
  'fas fa-envelope': { unicode: '\uf0e0', weight: '900' },

  // 状态符号
  'fas fa-check-circle': { unicode: '\uf058', weight: '900' },
  'fas fa-times-circle': { unicode: '\uf057', weight: '900' },
  'fas fa-exclamation-circle': { unicode: '\uf06a', weight: '900' },
  'fas fa-info-circle': { unicode: '\uf05a', weight: '900' },
  'fas fa-question-circle': { unicode: '\uf059', weight: '900' },

  // 形状几何
  'fas fa-certificate': { unicode: '\uf0a3', weight: '900' },

  // 评价与等级
  'fas fa-thumbs-up': { unicode: '\uf164', weight: '900' },
  'fas fa-thumbs-down': { unicode: '\uf165', weight: '900' },
  'fas fa-trophy': { unicode: '\uf091', weight: '900' },

  // 工具图标
  'fas fa-cog': { unicode: '\uf013', weight: '900' },
  'fas fa-wrench': { unicode: '\uf0ad', weight: '900' },
  'fas fa-search': { unicode: '\uf002', weight: '900' },
  'fas fa-filter': { unicode: '\uf0b0', weight: '900' },
  'fas fa-edit': { unicode: '\uf044', weight: '900' },

  // Regular 图标 (weight: 400)
  'far fa-circle': { unicode: '\uf111', weight: '400' },
  'far fa-square': { unicode: '\uf0c8', weight: '400' },
  'far fa-star': { unicode: '\uf005', weight: '400' },
}

/**
 * 根据 Font Awesome 类名获取对应的 Unicode 码点和字重
 * @param iconClass Font Awesome 图标类名，如 'fas fa-check'
 * @returns 包含 unicode 和 weight 的对象，如果未找到则返回默认值
 */
export function getFAUnicode(iconClass: string): { unicode: string; weight: string } {
  const mapping = FA_ICON_MAP[iconClass]
  if (mapping) {
    return mapping
  }

  // 默认返回圆点
  console.warn(`Font Awesome icon "${iconClass}" not found in mapping, using default`)
  return { unicode: '\uf111', weight: '900' }
}