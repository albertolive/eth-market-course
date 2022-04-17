import { Hero, Modal } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { CourseCard } from "@components/ui/course";

export default function Home({ courses }) {
  return (
    <BaseLayout>
      <Hero />
      <CourseList courses={courses}>
        {(course) => <CourseCard key={course.id} course={course} />}
      </CourseList>
      <Modal />
    </BaseLayout>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return { props: { courses: data } };
}
