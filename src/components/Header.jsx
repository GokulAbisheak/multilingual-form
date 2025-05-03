const Header = ({ setLanguage }) => {
  return (
    <div className="w-full h-[64px] border-b border-gray-300 flex items-center justify-between px-5">
      <div className="text-xl font-semibold">Multilingual Quiz</div>
      <div>
        <select
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="en">English</option>
          <option value="si">Sinhala</option>
          <option value="ta">Tamil</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
