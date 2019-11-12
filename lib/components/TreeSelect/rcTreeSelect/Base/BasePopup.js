"use strict";

exports.__esModule = true;
exports.default = exports.popupContextTypes = void 0;

require("core-js/modules/es6.object.assign");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _rcTree = _interopRequireDefault(require("../../rcTree"));

var _index = _interopRequireDefault(require("../../../Spin/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var popupContextTypes = {
  onPopupKeyDown: _propTypes.default.func.isRequired,
  onTreeNodeSelect: _propTypes.default.func.isRequired,
  onTreeNodeCheck: _propTypes.default.func.isRequired
};
exports.popupContextTypes = popupContextTypes;

var BasePopup =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BasePopup, _React$Component);

  BasePopup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var _ref = prevState || {},
        _ref$prevProps = _ref.prevProps,
        prevProps = _ref$prevProps === void 0 ? {} : _ref$prevProps,
        loadedKeys = _ref.loadedKeys;

    var valueList = nextProps.valueList,
        valueEntities = nextProps.valueEntities,
        keyEntities = nextProps.keyEntities,
        filteredTreeNodes = nextProps.filteredTreeNodes,
        upperSearchValue = nextProps.upperSearchValue;
    var newState = {
      prevProps: nextProps
    }; // Check value update

    if (valueList !== prevProps.valueList) {
      newState.keyList = valueList.map(function (_ref2) {
        var value = _ref2.value;
        return valueEntities[value];
      }).filter(function (entity) {
        return entity;
      }).map(function (_ref3) {
        var key = _ref3.key;
        return key;
      });
    } // 清空搜索内容后恢复搜索前的展开状态


    if (upperSearchValue && !prevState.savedExpandedKeyList) {
      // 保存搜索前展开的节点
      newState.prevExpandedKeyList = Array.isArray(prevState.expandedKeyList) ? [].concat(prevState.expandedKeyList) : [];
      newState.savedExpandedKeyList = true;
    } else if (!upperSearchValue && prevState.savedExpandedKeyList) {
      // 恢复搜索前展开的节点
      newState.expandedKeyList = Array.isArray(prevState.prevExpandedKeyList) ? [].concat(prevState.prevExpandedKeyList) : [];
      newState.savedExpandedKeyList = false;
    } // Show all when tree is in filter mode


    if (filteredTreeNodes && filteredTreeNodes.length && filteredTreeNodes !== prevProps.filteredTreeNodes) {
      newState.expandedKeyList = Object.keys(keyEntities);
    } // Clean loadedKeys if key not exist in keyEntities anymore


    if (nextProps.loadData) {
      newState.loadedKeys = loadedKeys.filter(function (key) {
        return key in keyEntities;
      });
    }

    return newState;
  };

  function BasePopup(props) {
    var _this;

    _this = _React$Component.call(this) || this;

    _defineProperty(_assertThisInitialized(_this), "onTreeExpand", function (expandedKeyList, extra) {
      var _this$props = _this.props,
          onTreeExpanded = _this$props.onTreeExpanded,
          onExpand = _this$props.onExpand;

      _this.setState({
        expandedKeyList: expandedKeyList
      }, onTreeExpanded);

      onExpand && onExpand(expandedKeyList, extra);
    });

    _defineProperty(_assertThisInitialized(_this), "onLoad", function (loadedKeys) {
      _this.setState({
        loadedKeys: loadedKeys
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterTreeNode", function (treeNode) {
      var _this$props2 = _this.props,
          upperSearchValue = _this$props2.upperSearchValue,
          treeNodeFilterProp = _this$props2.treeNodeFilterProp;
      var filterVal = treeNode.props[treeNodeFilterProp];

      if (typeof filterVal === 'string') {
        return upperSearchValue && filterVal.toUpperCase().indexOf(upperSearchValue) !== -1;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "renderNotFound", function () {
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          notFoundContent = _this$props3.notFoundContent,
          loading = _this$props3.loading;
      return _react.default.createElement("span", {
        className: prefixCls + "-not-found"
      }, loading ? _react.default.createElement(_index.default, {
        size: "small"
      }) : notFoundContent);
    });

    var treeDefaultExpandAll = props.treeDefaultExpandAll,
        treeDefaultExpandedKeys = props.treeDefaultExpandedKeys,
        keyEntities = props.keyEntities; // TODO: make `expandedKeyList` control

    var _expandedKeyList = treeDefaultExpandedKeys;

    if (treeDefaultExpandAll) {
      _expandedKeyList = Object.keys(keyEntities);
    }

    _this.state = {
      keyList: [],
      expandedKeyList: _expandedKeyList,
      loadedKeys: []
    };
    return _this;
  }

  var _proto = BasePopup.prototype;

  _proto.render = function render() {
    var _this$state = this.state,
        keyList = _this$state.keyList,
        expandedKeyList = _this$state.expandedKeyList,
        loadedKeys = _this$state.loadedKeys;
    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        treeNodes = _this$props4.treeNodes,
        filteredTreeNodes = _this$props4.filteredTreeNodes,
        showIcon = _this$props4.showIcon,
        treeLine = _this$props4.treeLine,
        treeCheckable = _this$props4.treeCheckable,
        treeCheckStrictly = _this$props4.treeCheckStrictly,
        multiple = _this$props4.multiple,
        loadData = _this$props4.loadData,
        loading = _this$props4.loading,
        ariaId = _this$props4.ariaId,
        renderSearch = _this$props4.renderSearch,
        renderResetItem = _this$props4.renderResetItem,
        autoExpandParent = _this$props4.autoExpandParent,
        icon = _this$props4.icon;
    var _this$context$rcTreeS = this.context.rcTreeSelect,
        onPopupKeyDown = _this$context$rcTreeS.onPopupKeyDown,
        onTreeNodeSelect = _this$context$rcTreeS.onTreeNodeSelect,
        onTreeNodeCheck = _this$context$rcTreeS.onTreeNodeCheck;
    var treeProps = {};

    if (treeCheckable) {
      treeProps.checkedKeys = keyList;
    } else {
      treeProps.selectedKeys = keyList;
    }

    var $notFound;
    var $treeNodes;

    if (!treeNodes || !treeNodes.length || loading) {
      $notFound = this.renderNotFound();
    } else if (filteredTreeNodes) {
      if (filteredTreeNodes.length) {
        treeProps.checkStrictly = true;
        $treeNodes = filteredTreeNodes;
      } else {
        $notFound = this.renderNotFound();
      }
    } else {
      $treeNodes = treeNodes;
    }

    var $tree;
    var isNotFound = false;

    if ($notFound) {
      $tree = $notFound;
      isNotFound = true;
    } else {
      $tree = _react.default.createElement(_rcTree.default, _extends({
        autoExpandParent: autoExpandParent,
        prefixCls: prefixCls + "-tree",
        className: (0, _classnames.default)(!showIcon && prefixCls + "-tree-icon-hide"),
        icon: icon,
        showIcon: showIcon,
        showLine: treeLine,
        selectable: !treeCheckable,
        checkable: treeCheckable,
        checkStrictly: treeCheckStrictly,
        multiple: multiple,
        loadData: loadData,
        loadedKeys: loadedKeys,
        expandedKeys: expandedKeyList,
        filterTreeNode: this.filterTreeNode,
        onSelect: onTreeNodeSelect,
        onCheck: onTreeNodeCheck,
        onExpand: this.onTreeExpand,
        onLoad: this.onLoad
      }, treeProps), $treeNodes);
    }

    return _react.default.createElement("div", {
      className: prefixCls + "-base-popup",
      role: "listbox",
      id: ariaId,
      onKeyDown: onPopupKeyDown,
      tabIndex: -1
    }, renderSearch ? renderSearch() : null, renderResetItem && !isNotFound ? renderResetItem() : null, $tree);
  };

  return BasePopup;
}(_react.default.Component);

_defineProperty(BasePopup, "propTypes", {
  prefixCls: _propTypes.default.string,
  upperSearchValue: _propTypes.default.string,
  valueList: _propTypes.default.array,
  valueEntities: _propTypes.default.object,
  keyEntities: _propTypes.default.object,
  showIcon: _propTypes.default.bool,
  icon: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  treeLine: _propTypes.default.bool,
  treeNodeFilterProp: _propTypes.default.string,
  treeCheckable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node]),
  treeCheckStrictly: _propTypes.default.bool,
  treeDefaultExpandAll: _propTypes.default.bool,
  treeDefaultExpandedKeys: _propTypes.default.array,
  loadData: _propTypes.default.func,
  loading: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  autoExpandParent: _propTypes.default.bool,
  treeNodes: _propTypes.default.node,
  filteredTreeNodes: _propTypes.default.node,
  notFoundContent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  ariaId: _propTypes.default.string,
  // HOC
  renderSearch: _propTypes.default.func,
  renderResetItem: _propTypes.default.func,
  onTreeExpanded: _propTypes.default.func,
  // 确定或取消选择
  onCancel: _propTypes.default.func,
  onConfirm: _propTypes.default.func,
  onExpand: _propTypes.default.func // 节点展开时的回调

});

_defineProperty(BasePopup, "contextTypes", {
  rcTreeSelect: _propTypes.default.shape(Object.assign({}, popupContextTypes))
});

(0, _reactLifecyclesCompat.polyfill)(BasePopup);
var _default = BasePopup;
exports.default = _default;