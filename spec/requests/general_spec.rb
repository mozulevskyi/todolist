describe "the signin process", type: :feature, js: true do

  it 'User signs up and creates a Project' do
    visit '/users/sign_up'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'

    expect(page).to have_content 'Todolist'

    click_button 'New Project'

    find('.projectInput').set('Test Project')

    click_button 'Add'

    expect(page).to have_content 'Test Project'
  end
end