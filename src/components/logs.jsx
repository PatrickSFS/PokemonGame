/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Collapse } from 'react-collapse';

function ExpandableLog({ log }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className=" p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-max">
      <button
        onClick={toggleExpand}
        className="text-left text-white font-semibold mb-4 px-4 py-2 bg-[#222222]rounded-lg hover:bg-[#222222] transition-colors duration-200 focus:outline-none "
      >
        {isExpanded ? 'Fechar Logs' : 'Abrir Logs'}
      </button>

      <Collapse isOpened={isExpanded}>
        <div className="overflow-auto  rounded-lg p-4 max-h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          {log.map((logItem, index) => (
            <p key={index} className="text-sm mb-2">
              {logItem}
            </p>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default ExpandableLog;
