import { useState, useEffect } from 'react';
import close from '../image/close.png';
import icon from '../image/icon.png';

function Popup(props) {
    const [state, setState] = useState('overlay-close');
    const popupClose = () => {
        props.setPopupState(false);
        setState('overlay-close');
    }
    
    useEffect(()=>{
        if(props.open){
            setState('overlay-open');
        }
    }, [props.open]);
    
    return(
        <div className={state}>
            <div className="popup">
                <div className="popupTitle">
                    설정창
                    <span onClick={popupClose}>
                        <img src={close} alt="close"/>
                    </span>
                </div>
                <div className="popupContent">
                    <table>
                        <tbody>
                            <tr>
                                <td className="popupContentName">
                                    채팅방 배경
                                </td>
                                <td className="popupContentValue">
                                    <select name="backgroundColor">
                                        <option value="basic">기본모드</option>
                                        <option value="dark">다크모드</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="popupContentName">
                                    글씨 크기
                                </td>
                                <td className="popupContentValue">
                                    <select name="fontSize">
                                        <option value="10pt">10</option>
                                        <option value="12pt">12</option>
                                        <option value="14pt">14</option>
                                        <option value="16pt">16</option>
                                        <option value="18pt">18</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className="popupContentName">
                                    소리 알림
                                </td>
                                <td className="popupContentValue">
                                    <input type="checkbox" value="soundAlert" defaultChecked="true"/>
                                </td>
                            </tr>
                            <tr>
                                <td className="popupContentName">
                                    알림창
                                </td>
                                <td className="popupContentValue">
                                    <select name="alertMes">
                                        <option value="nameMes">이름 & 메세지 모두</option>
                                        <option value="name">이름만</option>
                                        <option value="none">알림만</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="popupFooter">
                    <div className="popupFooterIcon">
                        <img src={icon} alt="icon"/>
                    </div>
                    <div className="popupFooterInfo">
                        Park So Hye, Chimy Talk <br/>
                        version 1.0.0 <br/>
                        버그/문의사항 : <a href="https://github.com/chimy2/Chatting-Web-App" rel="noreferrer" target="_blank">Chimy Talk Github</a>  
                    </div>
                </div>
            </div>
        </div>
    )   
}   
export default Popup;