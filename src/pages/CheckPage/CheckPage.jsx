import React, { useEffect, useMemo, useState } from 'react';
import cls from './CheckPage.module.scss';
import CheckHeader from '../../components/CheckHeader/CheckHeader';
import CheckList from '../../components/CheckList/CheckList';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckItemsList } from '../../redux/CheckSlice/selectors/getItemsList/getItemsList';
import { getCheckDataItems } from '../../redux/CheckSlice/selectors/getDataItems/getDataItems';
import Button from '../../components/Button/Button';
import RecommendModal from '../../components/RecommendModal/RecommendModal';
import { Link } from 'react-router-dom';
import { CheckActions } from '../../redux/CheckSlice/slice/checkSlice';
import RecItem from '../../components/RecItem/RecItem';
import { getItems } from '../../redux/CheckSlice/asyncThunks/getItems';

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

const CheckPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const itemsList = useSelector(getCheckItemsList);
  const dataItems = useSelector(getCheckDataItems);
  const isLoading = useSelector(state => state.check.isLoading || false)
  const dispatch = useDispatch();

  const total = useMemo(
    () => itemsList.reduce((currentTotal, item) => {
      return currentTotal + item.price * item.quantity
    }, 0),
  [itemsList])

  useEffect(() => {
    dispatch(CheckActions.clearData());
    if (isEmpty(dataItems)) {
      dispatch(getItems())
    }

    return () => {
      dispatch(CheckActions.clearData());
    }
  }, [])

  const openHandler = () => {
    setIsOpen(true);
  }

  const closeHandler = () => {
    setIsOpen(false);
  }

  console.log('isLoading', isLoading);

  if (isLoading) {
    return (
      <div className={cls.loaderWrapper}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className={cls.wrapper}>
        <div className={cls.container}>
          <Link to={'/'} className={cls.link}>Вернуться</Link>
          <CheckHeader />
          <RecItem />
          <CheckList />
          <div className={cls.bottom}>
            <div>
              Итого {total ? `${total} руб.` : ''}
            </div>
            <div>
              <Button
                onClick={openHandler}
                disabled={total ? false : true}
              >
                К оплате
              </Button>
            </div>
          </div>
        </div>
      </div>
      <RecommendModal
        isOpen={isOpen}
        onClose={closeHandler}
      />
    </>
  )
}

export default CheckPage;