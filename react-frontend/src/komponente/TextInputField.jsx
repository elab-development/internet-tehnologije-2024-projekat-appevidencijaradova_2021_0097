const TextField = ({type, id, placeholder, name, onInput})=>{
    return(
        <div>
            <input 
                type={type}
                id={id}
                className="form-control form-control-lg"
                placeholder={placeholder}
                name={name}
                onInput={onInput}
             />
        </div>
    );
};
export default TextField;