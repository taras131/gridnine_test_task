import React from 'react';
import preloaderStyles from './Preloader.module.css';

const Preloader = () => {
    return (
        <div className={preloaderStyles.wrapper}>
            ...Загрузка.....
        </div>
    );
};

export default Preloader;