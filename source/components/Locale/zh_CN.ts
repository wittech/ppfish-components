import { LocaleProperties } from '.';

const localeValues: LocaleProperties = {
  locale: 'zh_CN',
  global: {
    placeholder: '请选择',
  },
  AudioPlayer: {
    notSupport: '您的浏览器不支持 audio 标签。',
  },
  AutoComplete: {
    notFoundContent: '无匹配结果',
  },
  Cascader: {
    placeholder: '请选择',
    notFoundContent: '无匹配结果',
  },
  Table: {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    filterEmptyText: '无筛选项',
    selectAll: '全选当页',
    selectInvert: '反选当页',
    selectionAll: '全选所有',
    sortTitle: '排序',
    expand: '展开行',
    collapse: '关闭行',
    triggerDesc: '点击降序',
    triggerAsc: '点击升序',
    cancelSort: '取消排序',
  },
  Modal: {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
  },
  Form: {
    optional: '（可选）',
    defaultValidateMessages: {
      default: '字段验证错误${label}',
      required: '请输入${label}',
      enum: '${label}必须是其中一个[${enum}]',
      whitespace: '${label}不能为空字符',
    },
  },
  Transfer: {
    notFoundContent: '无匹配结果',
    sourceNotFoundContent: '暂无相关信息',
    targetNotFonudContent: '请从左侧选择添加',
    searchPlaceholder: '请输入关键字',
  },
  TreeSelect: {
    placeholder: '请选择',
    searchPlaceholder: '请输入关键字',
    treeNodeResetTitle: '不选择任何分类',
    notFoundContent: '无匹配结果',
    okText: '确定',
    cancelText: '取消',
  },
  Upload: {
    uploading: '上传中',
    removeFile: '移除文件',
    uploadError: '上传错误',
    previewFile: '预览文件',
    cancelText: '取消',
    deleteText: '全部删除',
    uploadedTip: '已上传 ${length} 项'
  },
};

export default localeValues;
