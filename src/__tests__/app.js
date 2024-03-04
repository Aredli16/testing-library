import {render, screen, waitFor} from '@testing-library/react'
import App from 'app'
import React from 'react'
import user from '@testing-library/user-event'
import {submitForm} from 'api'

jest.mock('../api', () => ({
  submitForm: jest.fn(),
}))

test('Cas passant', async () => {
  render(<App />)

  // 1 - l'utilisateur est sur la Home
  expect(window.location.pathname).toBe('/')

  // 2 - Un titre "Welcome home" est dans le document
  let heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent(/Welcome home/i)

  // 3 - Un lien "Fill out the form" est dans le document
  let link = screen.getByRole('link')
  expect(link).toBeInTheDocument()
  expect(link).toHaveTextContent(/Fill out the form/i)

  // 4 - l'utilisateur clique sur le lien
  link.click()

  // 5 - l'utilisateur est redirigé sur la page 1
  expect(window.location.pathname).toBe('/page-1')

  // 6 - Un titre "Page 1" est dans le document
  heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent(/Page 1/i)

  // 7 - un lien "Go home" est dans le document'/Go home/i'
  link = screen.getByRole('link', {name: /Go home/i})
  expect(link).toBeInTheDocument()

  // 8 - Un champ avec le label "Favorite food" est dans le document
  let form = screen.getByLabelText(/Favorite food/i)
  expect(form).toBeInTheDocument()

  // 9 - l'utilisateur rempli le champ avec "Les pâtes"
  user.type(form, 'Les pâtes')

  // 10 - un lien "Next" est dans le document
  link = screen.getByRole('link', {name: /Next/i})
  expect(link).toBeInTheDocument()

  // 11 - l'utilisateur clique sur le lien "Next"
  link.click()

  // 12 - l'utilisateur est redirigé sur la page 2
  expect(window.location.pathname).toBe('/page-2')

  // 13 - Un titre "Page 2" est dans le document
  heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent(/Page 2/i)

  // 14 - un lien "Go back" est dans le document
  expect(screen.getByRole('link', {name: /Go back/i})).toBeInTheDocument()

  // 15 - Un champ avec le label "Favorite drink" est dans le document
  form = screen.getByLabelText(/Favorite drink/i)
  expect(form).toBeInTheDocument()

  // 16 - l'utilisateur rempli le champ avec "Bière"
  user.type(form, 'Bière')

  // 17 - un lien "Review" est dans le document
  link = screen.getByRole('link', {name: /Review/i})
  expect(link).toBeInTheDocument()

  // 18 - l'utilisateur clique sur le lien "Review"
  link.click()

  // 19 - l'utilisateur est redirigé sur la page de confirmation
  expect(window.location.pathname).toBe('/confirm')

  // 20 - Un titre "Confirm" est dans le document
  heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent(/Confirm/i)

  // 21 - Un texte "Please confirm your choices" est dans le document
  expect(screen.getByText(/Please confirm your choices/i)).toBeInTheDocument()

  // 22 - Un texte label "favorite food" a pour contenu "Les pâtes"
  expect(screen.getByLabelText('Favorite Food')).toHaveTextContent('Les pâtes')

  // 23 - Un texte label "favorite drink" a pour contenu "Bière"
  expect(screen.getByLabelText('Favorite Drink')).toHaveTextContent('Bière')

  // 24 - un lien "Go back" est dans le document
  expect(screen.getByRole('link', {name: /Go back/i})).toBeInTheDocument()

  // 25 - un bouton "Confirm" est dans le document
  const button = screen.getByRole('button', {name: /Confirm/i})
  expect(button).toBeInTheDocument()

  // 26 - l'utilisateur clique sur le bouton "Confirm"
  submitForm.mockResolvedValueOnce({message: 'Success'})
  user.click(button)

  // 27 - l'utilisateur est redirigé sur la page de Félicitation
  await waitFor(() => {
    expect(window.location.pathname).toBe('/success')
  })

  // 28 - Un titre "Congrats. You did it." est dans le document
  heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
  expect(heading).toHaveTextContent(/Congrats. You did it./i)

  // 29 - un lien "Go home" est dans le document
  link = screen.getByRole('link', {name: /Go home/i})
  expect(link).toBeInTheDocument()

  // 30 - l'utilisateur clique sur le lien "Go Home"
  link.click()

  // 31 - l'utilisateur est redirigé sur la home
  expect(window.location.pathname).toBe('/')

  // 32 - Un titre "Welcome home" est dans le document
  heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument()
})
