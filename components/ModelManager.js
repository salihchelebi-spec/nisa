import React from 'react';
import Dropdown from './Dropdown.js';

const ModelManager = ({ locale, models = [], selected, onSelect }) => {
  console.debug('ModelManager rendered with', models.length, 'models');
  if (models.length === 0) {
    return <p>{locale.noModels}</p>;
  }
  return (
    <Dropdown
      label={locale.model}
      options={models.map((m) => ({ label: m, value: m }))}
      value={selected}
      onChange={onSelect}
    />
  );
};

export default ModelManager;
