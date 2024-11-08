/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Collapse } from 'react-collapse';

function ExpandableLog({ log }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-max">
      <button
        onClick={toggleExpand}
        className="text-left text-white font-semibold mb-4 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        {isExpanded ? 'Fechar Logs' : 'Abrir Logs'}
      </button>

      <Collapse isOpened={isExpanded}>
        <div className="overflow-auto bg-gray-800 rounded-lg p-4 max-h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
          {log.map((logItem, index) => (
            <p key={index} className="text-white text-sm mb-2">
              {logItem}
            </p>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default ExpandableLog;
