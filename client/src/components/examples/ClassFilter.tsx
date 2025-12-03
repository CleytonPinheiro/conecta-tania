import { useState } from 'react';
import ClassFilter from '../ClassFilter';

export default function ClassFilterExample() {
  const [filter, setFilter] = useState<'all' | '1C' | '2C'>('all');
  
  return (
    <ClassFilter 
      activeFilter={filter} 
      onFilterChange={setFilter}
      counts={{ all: 21, '1C': 4, '2C': 17 }}
    />
  );
}
