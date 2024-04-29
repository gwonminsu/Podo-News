
function LoginBtn( { onLoginClick } ) {

    return(
        <div className='flex justify-center items-center'>
            <button onClick={onLoginClick} className="flex justify-center items-center px-20 py-1 bg-slate-50 rounded shadow-custom01 hover:bg-slate-300 transition-colors">
                <img src="images/logo.png" alt="Logo" className="h-6 w-4" />
                <div className=" text-xl font-bold text-black ml-2">필 팩 로그인</div>
            </button>
        </div>
    );
}

export default LoginBtn;