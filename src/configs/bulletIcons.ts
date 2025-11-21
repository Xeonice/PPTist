export interface BulletIcon {
  type: 'unicode' | 'fontawesome' | 'material'  // 图标类型
  value: string      // Unicode 字符或图标类名
  name: string       // 描述名称
  category: string   // 分类
  font?: string      // 字体名称（可选）
}

// Unicode 符号集合（仅包含 Wingding 字体支持的符号）
export const UNICODE_BULLETS: BulletIcon[] = [
  // 基础几何（Wingding 支持）
  { type: 'unicode', value: '●', name: '实心圆', category: '基础' },
  { type: 'unicode', value: '○', name: '空心圆', category: '基础' },
  { type: 'unicode', value: '□', name: '空心方块', category: '基础' },
  { type: 'unicode', value: '▲', name: '实心三角', category: '基础' },
  { type: 'unicode', value: '△', name: '空心三角', category: '基础' },
  { type: 'unicode', value: '▶', name: '右三角', category: '基础' },
  { type: 'unicode', value: '◆', name: '实心菱形', category: '基础' },
  { type: 'unicode', value: '◇', name: '空心菱形', category: '基础' },

  // 箭头类（Wingding 支持）
  { type: 'unicode', value: '→', name: '右箭头', category: '箭头' },
  { type: 'unicode', value: '←', name: '左箭头', category: '箭头' },
  { type: 'unicode', value: '↑', name: '上箭头', category: '箭头' },
  { type: 'unicode', value: '↓', name: '下箭头', category: '箭头' },

  // 符号类（Wingding 支持）
  { type: 'unicode', value: '✓', name: '勾选', category: '符号' },
  { type: 'unicode', value: '✔', name: '粗勾选', category: '符号' },
  { type: 'unicode', value: '✗', name: '叉号', category: '符号' },
  { type: 'unicode', value: '✘', name: '粗叉号', category: '符号' },

  // 星形类（Wingding 支持）
  { type: 'unicode', value: '★', name: '实心五角星', category: '星形' },
  { type: 'unicode', value: '☆', name: '空心五角星', category: '星形' },

  // 扑克牌符号（Wingding 支持）
  { type: 'unicode', value: '♠', name: '黑桃', category: '扑克' },
  { type: 'unicode', value: '♣', name: '梅花', category: '扑克' },
  { type: 'unicode', value: '♥', name: '红心', category: '扑克' },
  { type: 'unicode', value: '♦', name: '方块', category: '扑克' },

  // 其他符号（Wingding 支持）
  { type: 'unicode', value: '✉', name: '信封', category: '其他' },
  { type: 'unicode', value: '☎', name: '电话', category: '其他' },
]

// Font Awesome 图标集合（已移除，不在 Wingding 字体中）
export const FONTAWESOME_BULLETS: BulletIcon[] = []

// 按分类组织的 Unicode 符号集合
export const UNICODE_BY_CATEGORY = UNICODE_BULLETS.reduce((acc, icon) => {
  if (!acc[icon.category]) acc[icon.category] = []
  acc[icon.category].push(icon)
  return acc
}, {} as Record<string, BulletIcon[]>)

// 按分类组织的 Font Awesome 图标集合
export const FONTAWESOME_BY_CATEGORY = FONTAWESOME_BULLETS.reduce((acc, icon) => {
  if (!acc[icon.category]) acc[icon.category] = []
  acc[icon.category].push(icon)
  return acc
}, {} as Record<string, BulletIcon[]>)

// 按分类组织的所有图标集合
export const BULLETS_BY_CATEGORY = [...UNICODE_BULLETS, ...FONTAWESOME_BULLETS].reduce((acc, icon) => {
  if (!acc[icon.category]) acc[icon.category] = []
  acc[icon.category].push(icon)
  return acc
}, {} as Record<string, BulletIcon[]>)

// 默认推荐的项目符号（仅包含 Wingding 支持的符号）
export const DEFAULT_BULLETS: BulletIcon[] = [
  { type: 'unicode', value: '●', name: '实心圆', category: '推荐' },
  { type: 'unicode', value: '○', name: '空心圆', category: '推荐' },
  { type: 'unicode', value: '■', name: '实心方块', category: '推荐' },
  { type: 'unicode', value: '□', name: '空心方块', category: '推荐' },
  { type: 'unicode', value: '◆', name: '实心菱形', category: '推荐' },
  { type: 'unicode', value: '▶', name: '右三角', category: '推荐' },
  { type: 'unicode', value: '→', name: '右箭头', category: '推荐' },
  { type: 'unicode', value: '✓', name: '勾选', category: '推荐' },
  { type: 'unicode', value: '★', name: '实心五角星', category: '推荐' },
  { type: 'unicode', value: '☆', name: '空心五角星', category: '推荐' },
]