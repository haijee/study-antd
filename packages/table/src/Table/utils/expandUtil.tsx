import * as React from 'react';
import classNames from 'classnames';
import type { RenderExpandIconProps, Key, GetRowKey } from '../interface';

export const renderExpandIcon = ({ prefixCls, record, onExpand, expanded, expandable }) => {
  const expandClassName = `${prefixCls}-row-expand-icon`;

  if (!expandable) {
    return <span className={classNames(expandClassName, `${prefixCls}-row-spaced`)} />;
  }

  const onClick: React.MouseEventHandler<HTMLElement> = event => {
    onExpand(record, event);
    event.stopPropagation();
  };

  return (
    <span
      className={classNames(expandClassName, {
        [`${prefixCls}-row-expanded`]: expanded,
        [`${prefixCls}-row-collapsed`]: !expanded,
      })}
      onClick={onClick}
    />
  );
};

export function findAllChildrenKeys<RecordType>(
  data: readonly RecordType[],
  getRowKey: GetRowKey<RecordType>,
  childrenColumnName: string,
): Key[] {
  const keys: Key[] = [];
  function dig(list: readonly RecordType[]) {
    (list || []).forEach((item, index) => {
      keys.push(getRowKey(item, index));

      dig(item[childrenColumnName]);
    });
  }
  dig(data);
  return keys;
}