function Heading() {
  return React.createElement(
    'center',
    null,
    React.createElement(
      'b',
      null,
      'Scott Magisano'
    ),
    React.createElement('br', null),
    '511 Lake Street, Apt 408D',
    React.createElement('br', null),
    'Fort Collins, CO  80521',
    React.createElement('br', null),
    '720-313-0202',
    React.createElement('br', null),
    'Smag@rams.colostate.edu',
    React.createElement('br', null)
  );
}
function Qualifications() {
  return React.createElement(
    'left',
    null,
    React.createElement(
      'b',
      null,
      'Qualifications'
    ),
    React.createElement('br', null),
    'Programming Languages:  Java, Python, C, C++',
    React.createElement('br', null),
    'Operating Systems: UNIX, Windows',
    React.createElement('br', null),
    'Data Analysis:  MatLab, R, Apache platforms',
    React.createElement('br', null),
    React.createElement(
      'li',
      null,
      'Comfortable explaining complex ideas to others'
    ),
    React.createElement(
      'li',
      null,
      'Problem solving and data analysis'
    ),
    React.createElement(
      'li',
      null,
      'Able to work in teams and learn new concepts and ideas and implement into work projects'
    ),
    React.createElement('br', null)
  );
}
function Education() {
  return React.createElement(
    'left',
    null,
    React.createElement(
      'b',
      null,
      'Education'
    ),
    React.createElement('br', null),
    'Colorado State University, Fort Collins, CO, May 2019',
    React.createElement('br', null),
    'Bachelor of Science Computer Science and Applied Mathematics',
    React.createElement('br', null),
    'GPA:  3.27',
    React.createElement('br', null),
    React.createElement('br', null)
  );
}
function Experience() {
  return React.createElement(
    'left',
    null,
    React.createElement(
      'b',
      null,
      'Related Experience'
    ),
    React.createElement('br', null),
    'Colorado State University, Fort Collins, CO, June 2017',
    React.createElement('br', null),
    'SWIFT instructor, Computer Science Department',
    React.createElement('br', null),
    React.createElement(
      'li',
      null,
      'Two-week camp for women ages 15 \u2013 17 where I introduced       programming in Python'
    ),
    React.createElement(
      'li',
      null,
      'Created lesson plan and delivered information on a website using HTML'
    ),
    React.createElement(
      'li',
      null,
      'Introduced programming languages and career opportunities in Computer Science'
    ),
    'Big Data, Computer Science Department, January 2017 \u2013 present',
    React.createElement('br', null),
    React.createElement(
      'li',
      null,
      'Sorting algorithms on data that is too large to load into memory including Geospatial data'
    ),
    React.createElement(
      'li',
      null,
      'Learning techniques in workflow and systems'
    ),
    React.createElement(
      'li',
      null,
      'Acquired skills in Apache platforms, memory partition, graph theory and edges '
    ),
    'Seismology, Mathematics Department, July 2017 \u2013 present',
    React.createElement('br', null),
    React.createElement(
      'li',
      null,
      'Examining seismology data from glaciers '
    ),
    React.createElement(
      'li',
      null,
      'Signal processing of data using self-made MATLAB tools',
      React.createElement('br', null),
      'Self-Directed, Social Media, June 2017 \u2013 July 2017'
    ),
    React.createElement(
      'li',
      null,
      'Research on sentiment analysis of Tweets of popular users and Tweets of negative postings'
    ),
    React.createElement(
      'li',
      null,
      'Utilizing Python for code and Vader sentiment analyzer'
    ),
    React.createElement('br', null),
    React.createElement('br', null)
  );
}
function Employment() {
  return React.createElement(
    'left',
    null,
    React.createElement(
      'b',
      null,
      'Employment'
    ),
    React.createElement('br', null),
    'Thai Basil Restaurant, Denver, CO, Summer 2016',
    React.createElement('br', null),
    'Delivery Driver working 30 hours per week',
    React.createElement('br', null),
    React.createElement('br', null)
  );
}
function Memberships() {
  return React.createElement(
    'left',
    null,
    React.createElement(
      'b',
      null,
      'Professional Memberships'
    ),
    React.createElement('br', null),
    'The American Institute of Aeronautics and Astronautics (AIAA) \u2013 member with an interest in Orbital',
    React.createElement('br', null),
    ' Mechanics',
    React.createElement('br', null)
  );
}
ReactDOM.render(React.createElement(Heading, null), document.getElementById('head'));
ReactDOM.render(React.createElement(Qualifications, null), document.getElementById('qual'));
ReactDOM.render(React.createElement(Education, null), document.getElementById('edu'));
ReactDOM.render(React.createElement(Experience, null), document.getElementById('exp'));
ReactDOM.render(React.createElement(Employment, null), document.getElementById('empl'));
ReactDOM.render(React.createElement(Memberships, null), document.getElementById('mem'));