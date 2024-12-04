from flask import Flask
from flask import render_template, url_for, request, redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('start.html')

@app.route('/options/')
def options():
    return render_template('options.html')

@app.route('/options/s/config/', methods=['POST', 'GET'])
def solitario():
    if request.method == 'POST':
        ars = request.form['arms']
        aed = request.form['armed']
        
        return redirect(url_for('solo_play', arms=ars, armed=aed))
    else:
        return render_template('solo.html')

@app.route('/options/s/play/')
def solo_play():
    arms = request.args.get('arms', type=int)
    armed = request.args.get('armed', type=int)

    if arms is None or armed is None:
        return redirect(url_for('solitario'))
    else:
        return render_template('solo_play.html', arms=arms, armed=armed)

@app.route('/options/c/config/', methods=['POST', 'GET'])
def cooperativo():
    if request.method == 'POST':
        p = request.form['players']
        m = request.form['munition']
        return redirect(url_for('coop_play', players=p, munition=m))
    else:
        return render_template('coop.html')

@app.route('/options/c/play/', methods=['POST', 'GET'])
def coop_play():
    p = request.args.get('players', type=int)
    m = request.args.get('munition', type=int)

    if p is None or m is None:
        return redirect(url_for('cooperativo'))
    else:
        if request.method == 'POST':
            pN = request.form.getlist('name-input')
            return render_template('coop_play.html', players=p, munition=m, player_names=pN)
        else:
            return render_template('coop_names.html', players=p, munition=m)

@app.route('/maintenance')
def maintenance():
    return render_template('maintenance.html')

if __name__ == '__main__':
    app.run(debug=True)
