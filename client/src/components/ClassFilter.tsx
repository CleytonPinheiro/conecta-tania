import { Button } from '@/components/ui/button';

type FilterOption = 'all' | '1C' | '2C';

type ClassFilterProps = {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  counts: {
    all: number;
    '1C': number;
    '2C': number;
  };
};

export default function ClassFilter({ activeFilter, onFilterChange, counts }: ClassFilterProps) {
  const filters: { value: FilterOption; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: '1C', label: 'Turma 1C' },
    { value: '2C', label: 'Turma 2C' },
  ];

  return (
    <div className="flex flex-wrap gap-2" data-testid="class-filter">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className="gap-2"
          data-testid={`button-filter-${filter.value}`}
        >
          {filter.label}
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeFilter === filter.value 
              ? 'bg-primary-foreground/20 text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {counts[filter.value]}
          </span>
        </Button>
      ))}
    </div>
  );
}
