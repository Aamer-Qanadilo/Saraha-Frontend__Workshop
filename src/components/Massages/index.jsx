import axios from "axios";
import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

const Massages = () => {

    let [massages, setMassages] = useState([])

    let getMassage = async()=>{
        let getToken = cookie.load("token")
        const AuthStr = 'tariq__'.concat(getToken);
        console.log(AuthStr)
        let { data } = await axios.get('http://localhost:3000/api/v1/message/',
            { headers: { authorization: AuthStr } })
        if(data.massage === "success")
            setMassages(data.messageList);
            console.log(data);
    };

    useEffect(()=>{
        getMassage();
    },[]);

    let deleteMassage = async () => {
        let getToken = cookie.load("token")
        const AuthStr = 'tariq__'.concat(getToken);
        let getId = cookie.load("session_id")
        let { data } = await axios.get(`http://localhost:3000/api/v1/message/${getId}`,
            { headers: { authorization: AuthStr }},
            {params: {authorization: AuthStr}})
            
            console.log(data);
    };

    return (
        <>
            <div>
                <div className="container text-center py-5 my-5 text-center">
                    <div className="card pt-5">
                        <a href data-toggle="modal" data-target="#profile">
                            <img src="img/avatar.png" className="avatar " alt />
                        </a>
                        <h3 className="py-2">Ahmed Abd Al-Muti</h3>
                        <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
                    </div>
                </div>
                {/* profile photo Modal */}
                <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Change photo</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <form action method="post">
                                        <label htmlFor className="text-muted">The file size of the photo should not exceed 7 MB</label>
                                        <input className="form-control" type="file" name="photo" id />
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-info">Upload</button>
                                <button type="button" className="btn btn-outline-danger">Remove Photo</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Share profile Modal */}
                <div className="modal fade" id="share" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Share Profile</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>host/messages/id</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /modal */}
                {/* =================messages=================== */}
                <div className="container text-center my-5 text-center">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card py-5">
                            <button type="submit" onClick={deleteMassage} className="btn btn-outline-danger">Delete</button>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Massage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {massages.map((message,index)=>
                                        <tr>  
                                            <td><button type="submit" onClick={deleteMassage} className="btn btn-outline-danger">Delete</button></td>
                                        </tr>
                                        )}

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Massages;