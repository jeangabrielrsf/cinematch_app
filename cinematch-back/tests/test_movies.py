from http import HTTPStatus

import factory.fuzzy

from cinematch_back.models import Movie


class MovieFactory(factory.Factory):
    class Meta:
        model = Movie

    title = factory.Faker('text')
    overview = factory.Faker('text')
    tmdb_id = factory.fuzzy.FuzzyInteger(1000)
    popularity = factory.fuzzy.FuzzyFloat(0.0, 1000.0)
    vote_average = factory.fuzzy.FuzzyFloat(0.0, 10.0)
    vote_count = factory.fuzzy.FuzzyInteger(1000)


def test_include_liked_movie(client, token):
    response = client.post(
        '/movies/',
        headers={'Authorization': f'Bearer {token}'},
        json={
            'title': 'Novo filme',
            'overview': 'Esse filme teste é demais',
            'tmdb_id': 1,
            'popularity': 1567.0,
            'vote_average': 6.8,
            'vote_count': 400,
        },
    )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 1,
        'title': 'Novo filme',
        'overview': 'Esse filme teste é demais',
        'tmdb_id': 1,
        'popularity': 1567.0,
        'vote_average': 6.8,
        'vote_count': 400,
    }


def test_list_liked_movies_empty(client, token):
    response = client.get(
        '/movies/', headers={'Authorization': f'Bearer {token}'}
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {'liked_movies': []}


def test_list_liked_movies_should_return_5_movies(
    client, session, token, user
):
    movies_quantity = 5
    session.bulk_save_objects(MovieFactory.create_batch(5, user_id=user.id))
    session.commit()

    response = client.get(
        '/movies/', headers={'Authorization': f'Bearer {token}'}
    )
    assert response.status_code == HTTPStatus.OK
    assert len(response.json()['liked_movies']) == movies_quantity
