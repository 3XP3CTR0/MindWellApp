interface BirthDateSelectorProps {
  value: Date;
  onChange: (date: Date) => void;
  label: string;
}

const BirthDateSelector = ({ value, onChange, label }: BirthDateSelectorProps) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    if (dateValue) {
      onChange(new Date(dateValue));
    }
  };

  const dateToString = (date: Date) => {
    // Format date as YYYY-MM-DD for the input
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <label htmlFor="birthdate-picker" className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      <input
        id="birthdate-picker"
        type="date"
        value={dateToString(value)}
        onChange={handleDateChange}
        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
       <div className="text-center p-3 mt-2 bg-white rounded-xl">
            <div className="text-lg font-semibold text-gray-800">
              {value.toLocaleDateString('pt-BR')}
            </div>
            <div className="text-sm text-gray-600">
              {calculateAge(value)} anos
            </div>
        </div>
    </div>
  );
};

export default BirthDateSelector;
