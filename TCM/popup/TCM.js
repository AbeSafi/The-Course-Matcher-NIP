import classesData from '../data/classes.json' assert { type: 'json' };
import questions from '../data/questions.json' assert { type: 'json' };

function findSimilarCourses(targetTags) {
  const targetSet = new Set(targetTags);

  const classesWithChange = classesData.courses.map(coursse => {
    const courseTags = new Set(course.tags || []);
    const intersection = new Set([...targetSet].filter(tags => courseTags.has(tags)));
    const difference = new Set([...courseTags].filter(tag => !targetSet.has(tag)));

    const matchWeight = 1.0;
    const newWeight = 0.3;

    const score = (intersection.size * matchWeight) - (difference.size * newWeight);

    return {
      ...course,
      score,
      intersectionSize: intersection.size,
      differenceSize: difference.size,
      matchingTags: [...intersection],
      newTags: [...difference]
    };
  }).sort((a, b) => b.score - a.score);
}

