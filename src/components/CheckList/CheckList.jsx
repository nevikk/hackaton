import React, { useEffect } from 'react';
import cls from './CheckList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckItemsList } from '../../redux/CheckSlice/selectors/getItemsList/getItemsList';
import Button from '../Button/Button';
import { CheckActions } from '../../redux/CheckSlice/slice/checkSlice';
import { classNames } from '../../helpers/ClassNames/classNames';

const CheckList = () => {
  const list = useSelector(getCheckItemsList);
  const dispatch = useDispatch();
  // console.log('list', list);
  const increaseQuantityHandler = (itemId) => {
    dispatch(CheckActions.increaseQuantity(itemId))
  }

  const decreaseQuantityHandler = (itemId) => {
    dispatch(CheckActions.decreaseQuantity(itemId))
  }

  useEffect(() => {
    // dispatch()
  }, [list])

  return (
    <div className={cls.wrapper}>
      <div className={classNames(cls.item, {}, [cls.header])}>
        <div>{'Id'}</div>
        <div>{'Название'}</div>
        <div>{'Цена'}</div>
        <div className={cls.columnQuantity}>{'Количество'}</div>
      </div>
      {list.map((item) => (
        <div
          key={item.id}
          className={cls.item}
        >
          <div>{item.id}</div>
          <div>{item.name}</div>
          <div>{item.price} руб.</div>
          <div className={cls.btns}>
            <Button
              className={cls.btn}
              onClick={() => {decreaseQuantityHandler(item.id)}}
            >-</Button>
            <div>{item.quantity}</div>
            <Button
              className={cls.btn}
              onClick={() => {increaseQuantityHandler(item.id)}}
            >+</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CheckList;