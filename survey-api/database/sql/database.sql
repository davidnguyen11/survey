create table employee (
  id serial primary key not null,
  full_name varchar(255) not null,
  gender boolean not null,
  active boolean not null DEFAULT False,
  position varchar(255) not null,
  is_admin boolean not null DEFAULT False,
  created_at timestamptz not null DEFAULT NOW(),
  updated_at timestamptz not null DEFAULT NOW()
);

create table reviewer_reviewee (
  id serial primary key not null,
  reviewer_id integer not null,
  reviewee_id integer not null,
  created_at timestamptz not null DEFAULT NOW(),
  updated_at timestamptz not null DEFAULT NOW()
);

create table performance (
  id serial primary key not null,
  content text not null,
  rating integer not null,
  employee_id integer not null,
  created_at timestamptz not null DEFAULT NOW(),
  updated_at timestamptz not null DEFAULT NOW()
);

