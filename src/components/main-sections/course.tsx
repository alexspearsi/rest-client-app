import { Code, Globe, Users } from 'lucide-react';
import { Heading } from '../ui/typography';
import { Badge } from '../ui/badge';

const technologies = [
  'React',
  'TypeScript',
  'Next.js',
  'Zustand',
  'Tailwind CSS',
];

export default function CourseSection() {
  return (
    <section>
      <div className="container mx-auto px-6 py-16 lg:px-20">
        <div className="mb-12 text-center">
          <Heading size="h2" className="mb-4">
            Our Team Project
          </Heading>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            REST Client is the final project of the RS School React 2025 Q3
            course - a collaborative effort that brings together key concepts of
            modern web development in a practical, real-world tool.
          </p>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Heading size="h3" className="mb-6">
              About RS School
            </Heading>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-secondary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                  <Code className="text-primary h-4 w-4" />
                </div>
                <div>
                  <Heading size="h4" className="mb-1">
                    Open to everyone
                  </Heading>
                  <p className="text-muted-foreground text-base">
                    Free courses, no obligations, and no contracts. No age
                    limit. Only students&apos; time and dedication are required.
                    Students can repeatedly attend courses.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                  <Users className="text-primary h-4 w-4" />
                </div>
                <div>
                  <Heading size="h4" className="mb-1">
                    Open source philosophy
                  </Heading>
                  <p className="text-muted-foreground text-base">
                    Our Learning Management System platform and educational
                    materials are publicly available on GitHub and YouTube.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-secondary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
                  <Globe className="text-primary h-4 w-4" />
                </div>
                <div>
                  <Heading size="h4" className="mb-1">
                    &quot;Teach it forward&quot;
                  </Heading>
                  <p className="text-muted-foreground text-base">
                    Students study at school for free, but we request that they
                    return as mentors to pass on their knowledge to the next
                    generation of students.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <Heading size="h3" className="mb-4">
              About the Project
            </Heading>

            <div className="mb-4 flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>

            <div>
              <p className="text-muted-foreground text-base">
                Over an 3-week period, we built this REST client to apply core
                concepts of modern web development - including React-based
                architecture, API communication, state management and deployment
                workflows.
              </p>
            </div>

            <div className="border-border mt-6 border-t pt-6">
              <p className="text-muted-foreground text-sm">
                This project reflects our practical knowledge of the React
                ecosystem and showcases everything we&apos;ve learned during the
                RS School React 2025 Q3 course.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
