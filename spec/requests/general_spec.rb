describe "the signin process", type: :feature, js: true do

  it 'User signs up and creates a Project' do
    visit '/users/sign_up'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'

    expect(page).to have_content 'Todolist'

    sleep 5

    click_button 'New Project'

    sleep 5

    find('.projectInput').set('Test Project')

    click_button 'Save'

    sleep 1

    expect(page).to have_content 'Test Project'

    find('.down_arrow').click

    click_button 'New Task'

    sleep 1

    find('.taskInput').set('Test Task')

    click_button 'Save'

    sleep 1
  end
end