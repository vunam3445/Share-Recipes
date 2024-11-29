const Input = ({ label, type, value, onChange, className,placeholder }) => (
  <div className="input-group">
    {label && <label>{label}</label>} {/* Hiển thị nhãn nếu có */}
    <input 
      type={type} 
      value={value} 
      placeholder={placeholder}
      onChange={onChange} 
      className={className} // Áp dụng các lớp CSS được truyền vào
    />
  </div>
);

export default Input;