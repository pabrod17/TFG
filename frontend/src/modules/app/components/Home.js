import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import canastaRed from './canastaRed.jpg';
import basketball from './basketball.jpg';
import basketRed2 from './basketRed2.jpg';
import canastaSimple from './canastaSimple.jpg';
import blackCanasta from './blackCanasta.jpg'; //1920x1200
import * as actionLesion from '../..//lesion/actions';

const handleFindAllLesions = (dispatch, history) => {
    dispatch(actionLesion.findAllLesion(() => history.push('/lesion/home')));
}

const Home = () => {
    const dispatch = useDispatch();
    const history = useHistory();


    return(

        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img class="d-block w-100 h-100" src={basketRed2} alt="First slide"/>
                <a href="/teams/all" class="btn-neon">
                    <span id="span1"></span>
                    <span id="span2"></span>
                    <span id="span3"></span>
                    <span id="span4"></span>
                    Teams
                </a>
            </div>
            <div class="carousel-item">
            <img class="d-block w-100" src={canastaRed} alt="Second slide"/>
                <a href="/seasons/all" class="btn-neon" onClick={() => handleFindAllLesions(dispatch, history)}>
                    <span id="span1"></span>
                    <span id="span2"></span>
                    <span id="span3"></span>
                    <span id="span4"></span>
                    Seasons
                </a>
            </div>
            <div class="carousel-item">
            <img class="d-block w-100 grande" src={blackCanasta} alt="Third slide"/>
                <a href="/lesion/home" class="btn-neon">
                    <span id="span1"></span>
                    <span id="span2"></span>
                    <span id="span3"></span>
                    <span id="span4"></span>
                    Lesion
                </a>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
    );

};

export default Home;
