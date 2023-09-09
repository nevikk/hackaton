import React, { useState } from 'react';
import cls from './MainPage.module.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import FileInput from '../../components/FileInput/FileInput';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CheckActions } from '../../redux/CheckSlice/slice/checkSlice';

const MainPage = () => {
  const [clickable, setClickable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const changeDatasetHandler = async (event) => {
    setClickable(false);
    setIsLoading(true);
    try {
      const files = new FormData();
      files.append('dataset', event.target.files[0]);
      const url = `http://127.0.0.1:5000/train_model`;
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        mode: 'cors',
        body: files
      });
      const data = await response.json();
      console.log('data', data);
      dispatch(CheckActions.setData(data));
    } catch (e) {
      console.log(e);
    } finally {
      setClickable(true);
      setIsLoading(false); 
    }
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.container}>
        <div className={cls.btns}>
          <div>
            <FileInput
              title={'Загрузить датасет'}
              accept={'.tsv'}
              name={'dataset'}
              changeHandler={changeDatasetHandler}
              disabled={!clickable}
            />
            {isLoading ? <Loader></Loader> : null}
          </div>
          {/* <Button disabled={true}>Датасет</Button> */}
          <div>
            <Link to={'/check'} className={cls.link}>
              <Button>Тест</Button>
            </Link>
          </div>
          <div>
            <Button disabled={true}>Загрузить чеки</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage;