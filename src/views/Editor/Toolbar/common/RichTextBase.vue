<template>
  <div class="rich-text-base">
    <SelectGroup class="row">
      <Select
        style="width: 60%;"
        :value="richTextAttrs.fontname"
        search
        searchLabel="搜索字体"
        @update:value="value => emitRichTextCommand('fontname', value as string)"
        :options="FONTS"
      >
        <template #icon>
          <IconFontSize />
        </template>
      </Select>
      <Select
        style="width: 40%;"
        :value="richTextAttrs.fontsize"
        search
        searchLabel="搜索字号"
        @update:value="value => emitRichTextCommand('fontsize', value as string)"
        :options="fontSizeOptions.map(item => ({
          label: item, value: item
        }))"
      >
        <template #icon>
          <IconAddText />
        </template>
      </Select>
    </SelectGroup>

    <ButtonGroup class="row" passive>
      <Popover trigger="click" style="width: 30%;">
        <template #content>
          <ColorPicker
            :modelValue="richTextAttrs.color"
            @update:modelValue="value => emitRichTextCommand('color', value)"
          />
        </template>
        <TextColorButton first v-tooltip="'文字颜色'" :color="richTextAttrs.color">
          <IconText />
        </TextColorButton>
      </Popover>
      <Popover trigger="click" style="width: 30%;">
        <template #content>
          <ColorPicker
            :modelValue="richTextAttrs.backcolor"
            @update:modelValue="value => emitRichTextCommand('backcolor', value)"
          />
        </template>
        <TextColorButton v-tooltip="'文字高亮'" :color="richTextAttrs.backcolor">
          <IconHighLight />
        </TextColorButton>
      </Popover>
      <Button 
        class="font-size-btn"
        style="width: 20%;"
        v-tooltip="'增大字号'"
        @click="emitRichTextCommand('fontsize-add')"
      ><IconFontSize />+</Button>
      <Button
        last
        class="font-size-btn"
        style="width: 20%;"
        v-tooltip="'减小字号'"
        @click="emitRichTextCommand('fontsize-reduce')"
      ><IconFontSize />-</Button>
    </ButtonGroup>

    <ButtonGroup class="row">
      <CheckboxButton 
        style="flex: 1;"
        :checked="richTextAttrs.bold"
        v-tooltip="'加粗'"
        @click="emitRichTextCommand('bold')"
      ><IconTextBold /></CheckboxButton>
      <CheckboxButton 
        style="flex: 1;"
        :checked="richTextAttrs.em"
        v-tooltip="'斜体'"
        @click="emitRichTextCommand('em')"
      ><IconTextItalic /></CheckboxButton>
      <CheckboxButton 
        style="flex: 1;"
        :checked="richTextAttrs.underline"
        v-tooltip="'下划线'"
        @click="emitRichTextCommand('underline')"
      ><IconTextUnderline /></CheckboxButton>
      <CheckboxButton 
        style="flex: 1;"
        :checked="richTextAttrs.strikethrough"
        v-tooltip="'删除线'"
        @click="emitRichTextCommand('strikethrough')"
      ><IconStrikethrough /></CheckboxButton>
    </ButtonGroup>

    <ButtonGroup class="row">
      <CheckboxButton
        style="flex: 1;"
        :checked="richTextAttrs.superscript"
        v-tooltip="'上标'"
        @click="emitRichTextCommand('superscript')"
      >A²</CheckboxButton>
      <CheckboxButton
        style="flex: 1;"
        :checked="richTextAttrs.subscript"
        v-tooltip="'下标'"
        @click="emitRichTextCommand('subscript')"
      >A₂</CheckboxButton>
      <CheckboxButton
        style="flex: 1;"
        :checked="richTextAttrs.code"
        v-tooltip="'行内代码'"
        @click="emitRichTextCommand('code')"
      ><IconCode /></CheckboxButton>
      <CheckboxButton
        style="flex: 1;"
        :checked="richTextAttrs.blockquote"
        v-tooltip="'引用'"
        @click="emitRichTextCommand('blockquote')"
      ><IconQuote /></CheckboxButton>
    </ButtonGroup>

    <ButtonGroup class="row" passive>
      <Popover trigger="click" v-model:value="AIPopoverVisible" style="width: 25%;">
        <template #content>
          <PopoverMenuItem center @click="execAI('美化改写')">美化</PopoverMenuItem>
          <PopoverMenuItem center @click="execAI('扩写丰富')">扩写</PopoverMenuItem>
          <PopoverMenuItem center @click="execAI('精简提炼')">精简</PopoverMenuItem>
        </template>
        <CheckboxButton
          first
          style="width: 100%;"
          v-tooltip="'AI辅助'"
        ><span :class="{ 'ai-loading': isAIWriting }">{{ isAIWriting ? '' : 'AI' }}</span></CheckboxButton>
      </Popover>
      <CheckboxButton
        style="flex: 1;"
        v-tooltip="'清除格式'"
        @click="emitRichTextCommand('clear')"
      ><IconFormat /></CheckboxButton>
      <CheckboxButton
        style="flex: 1;"
        :checked="!!textFormatPainter"
        v-tooltip="'格式刷（双击连续使用）'"
        @click="toggleTextFormatPainter()"
        @dblclick="toggleTextFormatPainter(true)"
      ><IconFormatBrush /></CheckboxButton>
      <Popover placement="bottom-end" trigger="click" v-model:value="linkPopoverVisible" style="width: 25%;">
        <template #content>
          <div class="link-popover">
            <Input v-model:value="link" placeholder="请输入超链接" />
            <div class="btns">
              <Button size="small" :disabled="!richTextAttrs.link" @click="removeLink()" style="margin-right: 5px;">移除</Button>
              <Button size="small" type="primary" @click="updateLink(link)">确认</Button>
            </div>
          </div>
        </template>
        <CheckboxButton
          last
          style="width: 100%;"
          :checked="!!richTextAttrs.link"
          v-tooltip="'超链接'"
          @click="openLinkPopover()"
        ><IconLinkOne /></CheckboxButton>
      </Popover>
    </ButtonGroup>
    <Divider />

    <RadioGroup 
      class="row" 
      button-style="solid" 
      :value="richTextAttrs.align"
      @update:value="value => emitRichTextCommand('align', value)"
    >
      <RadioButton value="left" v-tooltip="'左对齐'" style="flex: 1;"><IconAlignTextLeft /></RadioButton>
      <RadioButton value="center" v-tooltip="'居中'" style="flex: 1;"><IconAlignTextCenter /></RadioButton>
      <RadioButton value="right" v-tooltip="'右对齐'" style="flex: 1;"><IconAlignTextRight /></RadioButton>
      <RadioButton value="justify" v-tooltip="'两端对齐'" style="flex: 1;"><IconAlignTextBoth /></RadioButton>
    </RadioGroup>

    <div class="row" passive>
      <ButtonGroup style="flex: 1;">
        <Button
          first
          :type="richTextAttrs.bulletList ? 'primary' : 'default'"
          style="flex: 1;"
          v-tooltip="'项目符号'"
          @click="emitRichTextCommand('bulletList')"
        ><IconList /></Button>
        <Popover trigger="click" v-model:value="bulletListPanelVisible" placement="bottom-start">
          <template #content>
            <div class="bullet-panel">
              <!-- Tab 切换 -->
              <div class="bullet-tabs">
                <button
                  v-for="tab in bulletTabs"
                  :key="tab.key"
                  :class="['tab-button', { active: activeBulletTab === tab.key }]"
                  @click="activeBulletTab = tab.key"
                >
                  {{ tab.label }}
                </button>
              </div>

              <!-- 标准样式选项 -->
              <div v-if="activeBulletTab === 'standard'" class="bullet-section">
                <div class="list-wrap">
                  <ul class="list"
                    v-for="item in bulletListStyleTypeOption"
                    :key="item"
                    :style="{ listStyleType: item.startsWith('unicode:') ? 'none' : item }"
                    @click="emitRichTextCommand('bulletList', item)"
                  >
                    <li
                      class="list-item"
                      :class="{ 'unicode-item': item.startsWith('unicode:') }"
                      :data-bullet="item.startsWith('unicode:') ? item.split(':')[1] : ''"
                      v-for="key in 3"
                      :key="key"
                    ><span></span></li>
                  </ul>
                </div>
              </div>

              <!-- 推荐符号 -->
              <div v-if="activeBulletTab === 'recommended'" class="bullet-section">
                <div class="char-grid">
                  <button
                    v-for="bullet in defaultBullets"
                    :key="bullet.value"
                    class="char-button"
                    :title="bullet.name"
                    @click="selectCustomBullet(bullet)"
                  >
                    <span v-if="bullet.type === 'unicode'" class="unicode-char">{{ bullet.value }}</span>
                    <i v-else-if="bullet.type === 'fontawesome'" :class="bullet.value"></i>
                  </button>
                </div>
              </div>

              <!-- Unicode 符号分类 -->
              <div v-if="activeBulletTab === 'unicode'" class="bullet-section">
                <div
                  v-for="(chars, category) in unicodeBulletsByCategory"
                  :key="category"
                  class="category-group"
                >
                  <div class="category-name">{{ category }}</div>
                  <div class="char-grid">
                    <button
                      v-for="char in chars"
                      :key="char.value"
                      class="char-button"
                      :title="char.name"
                      @click="selectCustomBullet(char)"
                    >
                      <span class="unicode-char">{{ char.value }}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </template>
          <Button last class="popover-btn"><IconDown /></Button>
        </Popover>
      </ButtonGroup>
      <div style="width: 10px;"></div>
      <ButtonGroup style="flex: 1;" passive>
        <Button
          first
          :type="richTextAttrs.orderedList ? 'primary' : 'default'"
          style="flex: 1;"
          v-tooltip="'编号'"
          @click="emitRichTextCommand('orderedList')"
        ><IconOrderedList /></Button>
        <Popover trigger="click" v-model:value="orderedListPanelVisible">
          <template #content>
            <div class="list-wrap">
              <ul class="list" 
                v-for="item in orderedListStyleTypeOption" 
                :key="item" 
                :style="{ listStyleType: item }"
                @click="emitRichTextCommand('orderedList', item)"
              >
                <li class="list-item" v-for="key in 3" :key="key"><span></span></li>
              </ul>
            </div>
          </template>
          <Button last class="popover-btn"><IconDown /></Button>
        </Popover>
      </ButtonGroup>
    </div>

    <div class="row">
      <ButtonGroup style="flex: 1;" passive>
        <Button first style="flex: 1;" v-tooltip="'减小段落缩进'" @click="emitRichTextCommand('indent', '-1')"><IconIndentLeft /></Button>
        <Popover trigger="click" v-model:value="indentLeftPanelVisible">
          <template #content>
            <PopoverMenuItem center @click="emitRichTextCommand('textIndent', '-1')">减小首行缩进</PopoverMenuItem>
          </template>
          <Button last class="popover-btn"><IconDown /></Button>
        </Popover>
      </ButtonGroup>
      <div style="width: 10px;"></div>
      <ButtonGroup style="flex: 1;" passive>
        <Button first style="flex: 1;" v-tooltip="'增大段落缩进'" @click="emitRichTextCommand('indent', '+1')"><IconIndentRight /></Button>
        <Popover trigger="click" v-model:value="indentRightPanelVisible">
          <template #content>
            <PopoverMenuItem center @click="emitRichTextCommand('textIndent', '+1')">增大首行缩进</PopoverMenuItem>
          </template>
          <Button last class="popover-btn"><IconDown /></Button>
        </Popover>
      </ButtonGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import api from '@/services'
import { useMainStore } from '@/store'
import emitter, { EmitterEvents } from '@/utils/emitter'
import { FONTS } from '@/configs/font'
import useTextFormatPainter from '@/hooks/useTextFormatPainter'
import message from '@/utils/message'
import { htmlToText } from '@/utils/common'
import {
  UNICODE_BY_CATEGORY,
  DEFAULT_BULLETS,
  type BulletIcon
} from '@/configs/bulletIcons'

import TextColorButton from '@/components/TextColorButton.vue'
import CheckboxButton from '@/components/CheckboxButton.vue'
import ColorPicker from '@/components/ColorPicker/index.vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import ButtonGroup from '@/components/ButtonGroup.vue'
import Select from '@/components/Select.vue'
import SelectGroup from '@/components/SelectGroup.vue'
import Divider from '@/components/Divider.vue'
import Popover from '@/components/Popover.vue'
import RadioButton from '@/components/RadioButton.vue'
import RadioGroup from '@/components/RadioGroup.vue'
import PopoverMenuItem from '@/components/PopoverMenuItem.vue'

const { handleElement, handleElementId, richTextAttrs, textFormatPainter } = storeToRefs(useMainStore())

const { toggleTextFormatPainter } = useTextFormatPainter()

const fontSizeOptions = [
  '12px', '14px', '16px', '18px', '20px', '22px', '24px', '28px', '32px',
  '36px', '40px', '44px', '48px', '54px', '60px', '66px', '72px', '76px',
  '80px', '88px', '96px', '104px', '112px', '120px',
]

const emitRichTextCommand = (command: string, value?: string) => {
  emitter.emit(EmitterEvents.RICH_TEXT_COMMAND, { action: { command, value } })
}

const bulletListPanelVisible = ref(false)
const orderedListPanelVisible = ref(false)
const indentLeftPanelVisible = ref(false)
const indentRightPanelVisible = ref(false)

// 标准列表样式（包含 CSS 标准样式和常用 Unicode 符号）
const bulletListStyleTypeOption = ref([
  'disc',
  'circle',
  'square',
  'unicode:□:', // 空心方块
  'unicode:◆:', // 实心菱形
  'unicode:✓:', // 勾选
  'unicode:➤:', // 三角箭头
])
const orderedListStyleTypeOption = ref(['decimal', 'lower-roman', 'upper-roman', 'lower-alpha', 'upper-alpha', 'lower-greek'])

// 项目符号新增功能
const bulletTabs = [
  { key: 'standard', label: '标准' },
  { key: 'recommended', label: '推荐' },
  { key: 'unicode', label: 'Unicode' },
]

const activeBulletTab = ref('standard')
const defaultBullets = ref(DEFAULT_BULLETS)

// 分类整理的 Unicode 符号
const unicodeBulletsByCategory = computed(() => {
  return UNICODE_BY_CATEGORY
})

const link = ref('')
const linkPopoverVisible = ref(false)
const AIPopoverVisible = ref(false)
const isAIWriting = ref(false)

watch(richTextAttrs, () => linkPopoverVisible.value = false)
watch(handleElementId, () => {
  if (isAIWriting.value) isAIWriting.value = false
})

const openLinkPopover = () => {
  link.value = richTextAttrs.value.link
}
const updateLink = (link?: string) => {
  const linkRegExp = /^(https?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/
  if (!link || !linkRegExp.test(link)) return message.error('不是正确的网页链接地址')

  emitRichTextCommand('link', link)
  linkPopoverVisible.value = false
}

const removeLink = () => {
  emitRichTextCommand('link')
  linkPopoverVisible.value = false
}

// Unicode 符号相关方法
const selectCustomBullet = (bullet: BulletIcon) => {
  let value

  if (bullet.type === 'unicode') {
    value = `unicode:${bullet.value}:${bullet.font || ''}`
  }
  else if (bullet.type === 'fontawesome') {
    value = `fontawesome:${bullet.value}`
  }
  else {
    // 默认处理
    value = `unicode:${bullet.value}:${bullet.font || ''}`
  }

  emitRichTextCommand('bulletList', value)
  bulletListPanelVisible.value = false
}


const execAI = async (command: string) => {
  AIPopoverVisible.value = false

  if (!handleElement.value) return

  let content = ''
  if (handleElement.value.type === 'text' && handleElement.value.content) {
    content = handleElement.value.content
  }
  if (handleElement.value.type === 'shape' && handleElement.value.text && handleElement.value.text.content) {
    content = handleElement.value.text.content
  }

  if (!content) return message.error('没有可以执行的文本内容')

  let resultText = ''

  const stream = await api.AI_Writing({
    content: htmlToText(content),
    command,
  })

  isAIWriting.value = true

  const reader: ReadableStreamDefaultReader = stream.body.getReader()
  const decoder = new TextDecoder('utf-8')
  
  const readStream = () => {
    reader.read().then(({ done, value }) => {
      if (!isAIWriting.value) return
      if (done) {
        isAIWriting.value = false
        return
      }

      const chunk = decoder.decode(value, { stream: true })
      resultText += chunk
      emitRichTextCommand('replace', resultText)

      readStream()
    })
  }
  readStream()
}
</script>

<style lang="scss" scoped>
.rich-text-base {
  user-select: none;

  ::v-deep(.ai-loading) {
    width: 16px;
    height: 16px;
    display: inline-block;
    margin-top: 8px;
    border: 1px solid $themeColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spinner .8s linear infinite;
  }
}

// 项目符号面板样式
.bullet-panel {
  width: 320px;
  max-height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.bullet-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background: #f5f5f5;

  .tab-button {
    flex: 1;
    padding: 8px 12px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 12px;
    color: #666;
    transition: all 0.2s;

    &:hover {
      background: rgba($themeColor, 0.05);
    }

    &.active {
      background: white;
      color: $themeColor;
      font-weight: 500;
      border-bottom: 2px solid $themeColor;
      margin-bottom: -1px;
    }
  }
}

.bullet-section {
  padding: 12px;
  overflow-y: auto;
  max-height: 300px;
}

.section-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: bold;
}

.category-group {
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-name {
  font-size: 11px;
  color: #999;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.char-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
}

.char-button {
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 3px;
  font-size: 16px;

  &:hover {
    border-color: $themeColor;
    background: rgba($themeColor, 0.1);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  .unicode-char {
    font-size: 16px;
    line-height: 1;
  }
}

.custom-input {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
}

.custom-preview {
  font-size: 12px;
  color: #666;
  margin-top: 8px;

  .preview-list {
    margin-top: 4px;
    padding-left: 20px;

    li {
      color: #333;
      font-size: 14px;
    }
  }
}
.row {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.font-size-btn {
  padding: 0;
}
.link-popover {
  width: 240px;

  .btns {
    margin-top: 10px;
    text-align: right;
  }
}
.list-wrap {
  color: #666;
  padding: 8px;
  margin: -12px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
.list {
  background-color: $lightGray;
  padding: 4px 4px 4px 20px;
  cursor: pointer;

  &:not(:nth-child(3n)) {
    margin-right: 8px;
  }

  &:hover {
    color: $themeColor;

    span {
      background-color: $themeColor;
    }
  }

}

.list-item {
  width: 24px;
  height: 12px;
  position: relative;
  font-size: 12px;
  top: -3px;

  span {
    width: 100%;
    height: 2px;
    display: inline-block;
    position: absolute;
    top: 8px;
    background-color: #666;
  }

  // Unicode 自定义符号使用 ::marker 伪元素
  &.unicode-item::marker {
    content: attr(data-bullet) ' ';
    font-size: 12px;
  }
}
.popover-btn {
  padding: 0 3px;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>