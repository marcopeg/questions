INSERT INTO tests (id, name) VALUES 
(1, 'scrum')
ON CONFLICT (id) DO NOTHING;

SELECT setval('tests_id_seq', COALESCE((SELECT MAX(id)+1 FROM tests), 1), false);

SELECT import_test(1, '{
  "name": "Scrum Master Certification",
  "description": "hohoho",
  "icon": "school",
  "default_num_questions": 15,
  "default_category": "pippo",
  "categories": [
    {"name": "direct", "default_distribution": 50},
    {"name": "indirect", "default_distribution": 40}
  ],
  "questions": [
    {
      "text": "What are the disadvantages of the classical waterfall model?",
      "category": "direct",
      "answers": [
        {"text": "End-product has to be fully anticipated beforehand", "is_correct": false},
        {"text": "Some requirements defined in the beginning of the project are not really needed by the customer", "is_correct": false},
        {"text": "Each phase is strictly separated", "is_correct": false},
        {"text": "All of the above", "is_correct": true}
      ]
    },
    {
      "text": "What are the advantages of maintaining Sprint length throughout the project?",
      "answers": [
        {"text": "It helps to establish a consistent pattern of delivery", "is_correct": false},
        {"text": "It helps the team to objectively measure progress", "is_correct": false},
        {"text": "It provides a consistent means of measuring team velocity", "is_correct": false},
        {"text": "All of the above", "is_correct": true}
      ]
    }
  ]
}'::json);