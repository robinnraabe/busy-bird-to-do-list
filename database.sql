/* Database MUST be named 'weekend-to-do-app' */

CREATE TABLE "todo" (
"id" SERIAL PRIMARY KEY,
"task" VARCHAR (50) not null,
"color" VARCHAR (20) DEFAULT 'blue',
"due_date" DATE DEFAULT CURRENT_DATE,
"status" BOOLEAN DEFAULT false,
"notes" VARCHAR (280) DEFAULT '',
"notes_status" BOOLEAN DEFAULT false);


INSERT INTO "todo" ("task", "color", "notes")
VALUES  ('Feed the cat', 'rgb(255, 211, 35)', 'She''s been very good so she can have a treat too'),
		('Buy groceries', 'rgb(36, 220, 37)', 'To prepare for world domination'),
		('World domination', 'rgb(160, 129, 242)', ''),
		('Reinvent the wheel', 'rgb(37, 180, 255)', ''),
		('Clean room', 'rgb(254, 133, 148)', 'Only after world domination');