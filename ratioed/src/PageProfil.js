import { useEffect, useState } from 'react';
import NavigationPanel from './NavigationPanel';
import Switch from './Switch';
import ListeCommentaire from './ListeCommentaire';
import ListeFollow from './ListeFollow';
import "./style/PageProfil.css"
import axios from 'axios';
import moment from 'moment';

function PageProfil (props) {
    const {isConnected, login, logout, page, setPage, currentUser,setCurrentUser, handleProfile, getProfile, selectedUser, setSelectedUser} = props;
    const [ratio, setRatio] = useState(0);
    const [ratioed, setRatioed] = useState(0);
    const [nom , setNom] = useState("");
    const [prenom , setPrenom] = useState("");
    const [dateJ , setDateJ] = useState("");
    const [dateN , setDateN] = useState("");
    const [cptAvatar, setCptAvatar] = useState(0);
    const [avatar, setAvatar] = useState("https://robohash.org/"+selectedUser+cptAvatar+".png?bgset=bg1");
    

    useEffect(() => {
        getStats();
    }, [selectedUser]);


    const getStats = () => {
        const configuration = {
            method: "GET",
            url: "/api/user/stats/" + selectedUser,
        };
        axios(configuration)
            .then((response) => {
                console.log(response);
                setRatio(response.data.result.cptRatio);
                setRatioed(response.data.result.cptRatioed);
                setNom(response.data.result.lastname);
                setPrenom(response.data.result.firstname);
                setDateN(response.data.result.dateBirth);
                setDateJ(response.data.result.dateJoin);
                setCptAvatar(response.data.result.cptAvatar)
                setAvatar(response.data.result.avatar);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const formatDate = () => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateJ).toLocaleDateString('fr-FR', options);
    }


    return (
        <div className='profil'>
            <NavigationPanel isConnected={isConnected} login={login} logout={logout} currentUser={currentUser} setCurrentUser={setCurrentUser} getProfile={getProfile} handleProfile={handleProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            {(currentUser === selectedUser) ? <h1>Vous êtes sur votre profil</h1> : <h1>{selectedUser}</h1>}
            <Switch page={page} setPage={setPage} currentUser={currentUser} setCurrentUser={setCurrentUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
            <div className="main_content">
            <div className="statsP">
                <img src= {avatar} alt="profil-img" className="profilP"></img>
                <h3>@{selectedUser}</h3>
                <p className='nom'> {prenom} {nom}</p>
                <p className='date'>{moment().diff(dateN, 'years')} ans</p>
                <p className='date'>A rejoint Ratio'ed le : {formatDate()}</p>
                <p className='ratio'>Ratio : {ratio}</p>
                <p className='ratioed'>Ratioed : {ratioed}</p>
                <ListeFollow currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
            <ListeCommentaire currentUser={currentUser} page={page} setPage={setPage} handleProfile={handleProfile} getProfile={getProfile} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            </div>
        </div>
    );
}

export default PageProfil;