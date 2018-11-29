user1 = User.where(email: 'test@gmail.com', password: 'qwer1234', password_confirmation: 'qwer1234').create

5.times do
  project = user1.projects.create(
    title: [Faker::Hacker.adjective, Faker::Hacker.noun].join(' ').titleize
  )
  tasks = project.tasks.create(name: Faker::Hipster.sentence, deadline: Faker::Date.between(20.days.ago, 20.days.from_now))
  tasks.comments.create(body: Faker::Hacker.say_something_smart)
end
