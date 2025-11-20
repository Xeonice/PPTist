export interface BulletIcon {
  type: 'unicode' | 'fontawesome' | 'material'  // 图标类型
  value: string      // Unicode 字符或图标类名
  name: string       // 描述名称
  category: string   // 分类
  font?: string      // 字体名称（可选）
}

// Unicode 符号集合（无需额外字体）
export const UNICODE_BULLETS: BulletIcon[] = [
  // 基础几何
  { type: 'unicode', value: '●', name: '实心圆', category: '基础' },
  { type: 'unicode', value: '○', name: '空心圆', category: '基础' },
  { type: 'unicode', value: '■', name: '实心方块', category: '基础' },
  { type: 'unicode', value: '□', name: '空心方块', category: '基础' },
  { type: 'unicode', value: '▲', name: '实心三角', category: '基础' },
  { type: 'unicode', value: '△', name: '空心三角', category: '基础' },
  { type: 'unicode', value: '▶', name: '右三角', category: '基础' },
  { type: 'unicode', value: '▷', name: '右空心三角', category: '基础' },
  { type: 'unicode', value: '◆', name: '实心菱形', category: '基础' },
  { type: 'unicode', value: '◇', name: '空心菱形', category: '基础' },
  { type: 'unicode', value: '◉', name: '圆点', category: '基础' },

  // 箭头类
  { type: 'unicode', value: '→', name: '右箭头', category: '箭头' },
  { type: 'unicode', value: '←', name: '左箭头', category: '箭头' },
  { type: 'unicode', value: '↑', name: '上箭头', category: '箭头' },
  { type: 'unicode', value: '↓', name: '下箭头', category: '箭头' },
  { type: 'unicode', value: '⇒', name: '双线右箭头', category: '箭头' },
  { type: 'unicode', value: '➜', name: '粗右箭头', category: '箭头' },
  { type: 'unicode', value: '➤', name: '三角箭头', category: '箭头' },
  { type: 'unicode', value: '➡', name: '右指向', category: '箭头' },
  { type: 'unicode', value: '⮕', name: '空心右箭头', category: '箭头' },

  // 符号类
  { type: 'unicode', value: '✓', name: '勾选', category: '符号' },
  { type: 'unicode', value: '✔', name: '粗勾选', category: '符号' },
  { type: 'unicode', value: '✗', name: '叉号', category: '符号' },
  { type: 'unicode', value: '✘', name: '粗叉号', category: '符号' },
  { type: 'unicode', value: '✚', name: '加号', category: '符号' },
  { type: 'unicode', value: '✱', name: '星号', category: '符号' },
  { type: 'unicode', value: '※', name: '米字号', category: '符号' },
  { type: 'unicode', value: '◈', name: '菱形点', category: '符号' },
  { type: 'unicode', value: '◎', name: '双圆圈', category: '符号' },

  // 星形类
  { type: 'unicode', value: '★', name: '实心五角星', category: '星形' },
  { type: 'unicode', value: '☆', name: '空心五角星', category: '星形' },
  { type: 'unicode', value: '✦', name: '四角星', category: '星形' },
  { type: 'unicode', value: '✧', name: '空心四角星', category: '星形' },
  { type: 'unicode', value: '⬟', name: '五边形', category: '星形' },
  { type: 'unicode', value: '⬢', name: '六边形', category: '星形' },
  { type: 'unicode', value: '✯', name: '八角星', category: '星形' },

  // 手势类
  { type: 'unicode', value: '☛', name: '右手指向', category: '手势' },
  { type: 'unicode', value: '☚', name: '左手指向', category: '手势' },
  { type: 'unicode', value: '☝', name: '上手指向', category: '手势' },
  { type: 'unicode', value: '☟', name: '下手指向', category: '手势' },
  { type: 'unicode', value: '👉', name: '右指', category: '手势' },
  { type: 'unicode', value: '👈', name: '左指', category: '手势' },

  // 数字类
  { type: 'unicode', value: '❶', name: '圆圈1', category: '数字' },
  { type: 'unicode', value: '❷', name: '圆圈2', category: '数字' },
  { type: 'unicode', value: '❸', name: '圆圈3', category: '数字' },
  { type: 'unicode', value: '❹', name: '圆圈4', category: '数字' },
  { type: 'unicode', value: '❺', name: '圆圈5', category: '数字' },
  { type: 'unicode', value: '❻', name: '圆圈6', category: '数字' },
  { type: 'unicode', value: '❼', name: '圆圈7', category: '数字' },
  { type: 'unicode', value: '❽', name: '圆圈8', category: '数字' },
  { type: 'unicode', value: '❾', name: '圆圈9', category: '数字' },
  { type: 'unicode', value: '❿', name: '圆圈10', category: '数字' },

  // 其他符号
  { type: 'unicode', value: '♠', name: '黑桃', category: '其他' },
  { type: 'unicode', value: '♣', name: '梅花', category: '其他' },
  { type: 'unicode', value: '♥', name: '红心', category: '其他' },
  { type: 'unicode', value: '♦', name: '方块', category: '其他' },
  { type: 'unicode', value: '✉', name: '信封', category: '其他' },
  { type: 'unicode', value: '☎', name: '电话', category: '其他' },
  { type: 'unicode', value: '⚡', name: '闪电', category: '其他' },
  { type: 'unicode', value: '❄', name: '雪花', category: '其他' },
]

// Font Awesome 图标集合
export const FONTAWESOME_BULLETS: BulletIcon[] = [
  // 常用符号
  { type: 'fontawesome', value: 'fas fa-check', name: '勾选', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-times', name: '叉号', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-star', name: '星形', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-heart', name: '心形', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-circle', name: '圆形', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-square', name: '方形', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-dot-circle', name: '圆点', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-plus', name: '加号', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-minus', name: '减号', category: '常用' },
  { type: 'fontawesome', value: 'fas fa-play', name: '播放', category: '常用' },

  // 箭头类
  { type: 'fontawesome', value: 'fas fa-arrow-right', name: '右箭头', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-arrow-left', name: '左箭头', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-arrow-up', name: '上箭头', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-arrow-down', name: '下箭头', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-chevron-right', name: '右尖括号', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-chevron-left', name: '左尖括号', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-caret-right', name: '右三角', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-caret-left', name: '左三角', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-angle-right', name: '右角度', category: '箭头' },
  { type: 'fontawesome', value: 'fas fa-angle-left', name: '左角度', category: '箭头' },

  // 图标符号
  { type: 'fontawesome', value: 'fas fa-tag', name: '标签', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-bookmark', name: '书签', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-flag', name: '旗帜', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-thumbtack', name: '图钉', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-paperclip', name: '回形针', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-bell', name: '铃铛', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-lightbulb', name: '灯泡', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-key', name: '钥匙', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-lock', name: '锁', category: '图标' },
  { type: 'fontawesome', value: 'fas fa-envelope', name: '信封', category: '图标' },

  // 状态符号
  { type: 'fontawesome', value: 'fas fa-check-circle', name: '成功', category: '状态' },
  { type: 'fontawesome', value: 'fas fa-times-circle', name: '错误', category: '状态' },
  { type: 'fontawesome', value: 'fas fa-exclamation-circle', name: '警告', category: '状态' },
  { type: 'fontawesome', value: 'fas fa-info-circle', name: '信息', category: '状态' },
  { type: 'fontawesome', value: 'fas fa-question-circle', name: '疑问', category: '状态' },

  // 形状几何
  { type: 'fontawesome', value: 'far fa-circle', name: '空心圆', category: '形状' },
  { type: 'fontawesome', value: 'far fa-square', name: '空心方形', category: '形状' },
  { type: 'fontawesome', value: 'fas fa-certificate', name: '证书', category: '形状' },

  // 评价与等级
  { type: 'fontawesome', value: 'far fa-star', name: '空心星', category: '评价' },
  { type: 'fontawesome', value: 'fas fa-thumbs-up', name: '点赞', category: '评价' },
  { type: 'fontawesome', value: 'fas fa-thumbs-down', name: '点踩', category: '评价' },
  { type: 'fontawesome', value: 'fas fa-trophy', name: '奖杯', category: '评价' },

  // 工具图标
  { type: 'fontawesome', value: 'fas fa-cog', name: '设置', category: '工具' },
  { type: 'fontawesome', value: 'fas fa-wrench', name: '扳手', category: '工具' },
  { type: 'fontawesome', value: 'fas fa-search', name: '搜索', category: '工具' },
  { type: 'fontawesome', value: 'fas fa-filter', name: '筛选', category: '工具' },
  { type: 'fontawesome', value: 'fas fa-edit', name: '编辑', category: '工具' },
]

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

// 默认推荐的项目符号（包含 Unicode 和 Font Awesome）
export const DEFAULT_BULLETS: BulletIcon[] = [
  { type: 'unicode', value: '●', name: '实心圆', category: '推荐' },
  { type: 'unicode', value: '○', name: '空心圆', category: '推荐' },
  { type: 'unicode', value: '■', name: '实心方块', category: '推荐' },
  { type: 'unicode', value: '▶', name: '右三角', category: '推荐' },
  { type: 'unicode', value: '→', name: '右箭头', category: '推荐' },
  { type: 'unicode', value: '✓', name: '勾选', category: '推荐' },
  { type: 'fontawesome', value: 'fas fa-check', name: 'FA勾选', category: '推荐' },
  { type: 'fontawesome', value: 'fas fa-star', name: 'FA星形', category: '推荐' },
]