import React, { useState, useEffect } from 'react';
import uis from "../../../constants/ui.constant";
import { useNavigate } from 'react-router-dom';


export default function PrescSelect({ presc }) {
    const [prescList, setPrescList] = useState('');
    const [activeTab, setActiveTab] = useState(-1);
    const navigate = useNavigate();

    const selectList = (e) => {
        setPrescList(e.target.value);
        setActiveTab(e.target.selectedIndex - 1);
    }

    const handleEditPresc = () => {
        navigate("/prescription/edit");
    }

    const handleDetailPresc = () => {
        navigate("/prescription/detail");
    }

    return (

        <div>
            {/* 처방전 목록 컨테이너 */}
            <div className="border border-gray-300 w-full rounded-lg">
                <select id="prescList" value={prescList} onChange={selectList}
                    className="w-full border-none rounded-lg py-2"
                >
                    <option value="" disabled>--처방 목록을 선택해 주세요--</option>
                    {presc.map((presc, index) => (
                        <option key={index} value={presc.name} >
                            {presc.name}
                        </option>
                        
                    ))}
                </select>
            </div>
            <p className="mt-2">복용 기간: xxxxxxx </p>
                    


            {/*  약 목록 컨테이너 */}

            {activeTab >= 0 && presc[activeTab].pills.map((pill, index) => (
                <div key={index} className="flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-custom01 my-2">
                    <div className="flex items-center w-full p-3">
                        {/* 이미지 컨테이너 */}
                        <div>
                            <img
                                src={pill.image}
                                alt={`${pill.name} 로고`}
                                className="flex-none  overflow-hidden w-20 h-25 bg-white border-2 border-gray-300"
                            />
                        </div>
                        {/* 텍스트 컨테이너 */}
                        <div className="flex-grow ml-4">
                            <div className="text-sm font-semibold">
                                {pill.name}
                            </div>
                            <div className="text-xs">
                                {pill.description}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            className="relative flex justify-between items-center w-full py-2 bg-white rounded-b-lg hover:bg-mint01 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handleDetailPresc}
                        >
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.1rem] rounded-lg bg-gray-300"></span>
                            <div className='flex items-center text-sm text-mint03 font-semibold pl-4'>
                                <span className='ml-1'>약 상세 정보</span>
                            </div>
                            <img src={uis.next} alt="next" className='h-3 pr-4' />
                        </button>
                        <div className="fixed inset-x-0 bottom-20 mx-auto w-full px-4 flex justify-center">
                            <button className="bg-warn01 rounded-lg text-white p-2 mx-auto hover:bg-warn02" onClick={handleEditPresc}> 처방 정보 수정</button>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    )
}