import React, { useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckRecItem } from '../../redux/CheckSlice/selectors/getRecItem/getRecItem';
import cls from './RecommendModal.module.scss';
import { getCheckItemsList } from '../../redux/CheckSlice/selectors/getItemsList/getItemsList';
import Button from '../Button/Button';
import { CheckActions } from '../../redux/CheckSlice/slice/checkSlice';

const RecommendModal = (props) => {
  const {
    isOpen,
    onClose
  } = props;
  
  const recItem = useSelector(getCheckRecItem);
  const itemsList = useSelector(getCheckItemsList);
  const dispatch = useDispatch();

  const total = useMemo(
    () => itemsList.reduce((currentTotal, item) => {
      return currentTotal + item.price * item.quantity
    }, 0),
  [itemsList])

  const confirmHandler = () => {
    dispatch(CheckActions.addRecommendToList());
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
    >
      <div className={cls.item}>
        <div>{recItem.title}</div>
        <div>{recItem.price} руб.</div>
      </div>
      <div className={cls.total}>Итоговая сумма {total + recItem.price} руб.</div>
      <div className={cls.btns}>
        <Button
          className={cls.cancel}
          onClick={onClose}
        >
          Отклонить
        </Button>
        <Button
          onClick={confirmHandler}
        >
          Добавить
        </Button>
      </div>
    </Modal>
  )
}

export default RecommendModal;