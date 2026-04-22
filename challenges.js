// challenges.js — Python coding challenges for XCS229 topics
// Each challenge: { id, title, cat, difficulty, type, description, starter, tests, hint }

const CHALLENGES = [

  // ── Supervised Learning ───────────────────────────────────────────────────

  {
    id: 'sigmoid',
    title: 'Implement Sigmoid',
    cat: 'sl', difficulty: 'easy', type: 'implement',
    description: 'The sigmoid function is the core of logistic regression and a common activation function.\n\nImplement g(z) = 1 / (1 + e^(-z)).\n\nIt should map any real number to (0, 1) and handle extreme inputs without overflow.',
    starter:
`import math

def sigmoid(z):
    """
    Sigmoid function: g(z) = 1 / (1 + e^(-z))
    Maps any real number to the open interval (0, 1).
    """
    # TODO: implement
    pass

print(sigmoid(0))    # expect 0.5
print(sigmoid(2))    # expect ~0.8808
print(sigmoid(-2))   # expect ~0.1192`,
    tests: [
      { code: `assert sigmoid(0) == 0.5, "sigmoid(0) should be exactly 0.5"`,
        description: 'sigmoid(0) = 0.5' },
      { code: `assert abs(sigmoid(2) - 0.8807970779778823) < 1e-9, "sigmoid(2) is wrong"`,
        description: 'sigmoid(2) ≈ 0.8808' },
      { code: `assert abs(sigmoid(-2) - 0.11920292202211755) < 1e-9, "sigmoid(-2) is wrong"`,
        description: 'sigmoid(-2) ≈ 0.1192' },
      { code: `assert sigmoid(1000) > 1 - 1e-6, "sigmoid(1000) should be ~1 — check for overflow"`,
        description: 'handles large input without overflow' },
    ],
    hint: 'Return 1 / (1 + math.exp(-z)). Clamp z to [-500, 500] before calling exp to prevent overflow: z = min(max(z, -500), 500).',
  },

  {
    id: 'gd-debug',
    title: 'Debug: Gradient Descent',
    cat: 'sl', difficulty: 'medium', type: 'debug',
    description: 'This gradient descent implementation diverges — the loss increases each iteration instead of decreasing.\n\nFind and fix the bug. There is exactly one error.',
    starter:
`def mse(X, y, theta):
    m = len(y)
    return sum((theta[0] + theta[1]*X[i] - y[i])**2 for i in range(m)) / (2*m)

def gradient_descent(X, y, alpha=0.05, iters=200):
    """
    Gradient descent for linear regression: y = theta[0] + theta[1]*x
    Correct update: theta := theta - (alpha/m) * gradient
    """
    m = len(y)
    theta = [0.0, 0.0]
    for _ in range(iters):
        errors = [theta[0] + theta[1]*X[i] - y[i] for i in range(m)]
        theta[0] = theta[0] + (alpha/m) * sum(errors)                         # <-- bug?
        theta[1] = theta[1] + (alpha/m) * sum(errors[i]*X[i] for i in range(m))  # <-- bug?
    return theta

X = [1.0, 2.0, 3.0, 4.0, 5.0]
y = [5.0, 7.0, 9.0, 11.0, 13.0]   # y = 3 + 2x
theta = gradient_descent(X, y)
print(f"theta = [{theta[0]:.3f}, {theta[1]:.3f}]")
print(f"loss  = {mse(X, y, theta):.6f}")`,
    tests: [
      { code: `t = gradient_descent([1,2,3,4,5],[5,7,9,11,13]); assert abs(t[1]-2.0)<0.1, "Slope should be ~2, got "+str(round(t[1],3))`,
        description: 'slope converges to ~2' },
      { code: `t = gradient_descent([1,2,3,4,5],[5,7,9,11,13]); assert abs(t[0]-3.0)<0.5, "Intercept should be ~3, got "+str(round(t[0],3))`,
        description: 'intercept converges to ~3' },
      { code: `t = gradient_descent([1,2,3,4,5],[5,7,9,11,13]); assert mse([1,2,3,4,5],[5,7,9,11,13],t)<0.01, "Loss should be near 0 after convergence"`,
        description: 'loss is near zero after 200 iterations' },
    ],
    hint: 'Gradient descent subtracts the gradient: θ := θ − α∇J. The update is using + instead of −.',
  },

  {
    id: 'normal-eq',
    title: 'Implement Normal Equations',
    cat: 'sl', difficulty: 'medium', type: 'implement',
    description: 'The normal equations give a closed-form solution for linear regression:\n\n  θ = (XᵀX)⁻¹ Xᵀy\n\nX is the design matrix (with a bias column of 1s). Implement this using NumPy.',
    starter:
`import numpy as np

def normal_equations(X, y):
    """
    Compute optimal theta via the normal equations: theta = (X^T X)^{-1} X^T y
    X: numpy array (m, n) — design matrix, first column should be all 1s for bias
    y: numpy array (m,)
    Returns: theta of shape (n,)

    Use np.linalg.pinv (pseudoinverse) for numerical stability.
    """
    # TODO: implement in 1-2 lines
    pass

# Test: y = 1 + 2x  →  theta should be [1, 2]
X = np.array([[1, 1.0],
              [1, 2.0],
              [1, 3.0],
              [1, 4.0]])
y = np.array([3.0, 5.0, 7.0, 9.0])
theta = normal_equations(X, y)
print("theta =", theta)   # expect [1. 2.]`,
    tests: [
      { code: `import numpy as np; X=np.array([[1,1.],[1,2.],[1,3.],[1,4.]]); y=np.array([3.,5.,7.,9.]); t=normal_equations(X,y); assert np.allclose(t,[1.,2.],atol=1e-5), "Expected [1,2], got "+str(t)`,
        description: 'recovers theta = [1, 2] for y = 1 + 2x' },
      { code: `import numpy as np; X=np.array([[1,0.],[1,1.],[1,2.]]); y=np.array([5.,5.,5.]); t=normal_equations(X,y); assert np.allclose(t,[5.,0.],atol=1e-5), "Flat line: expected [5,0]"`,
        description: 'handles flat line y = 5' },
    ],
    hint: 'theta = np.linalg.pinv(X.T @ X) @ X.T @ y   — or use np.linalg.lstsq(X, y, rcond=None)[0] which is more numerically stable.',
  },

  // ── Deep Learning ─────────────────────────────────────────────────────────

  {
    id: 'softmax',
    title: 'Implement Softmax',
    cat: 'dl', difficulty: 'easy', type: 'implement',
    description: 'Softmax converts a vector of raw scores (logits) into a probability distribution.\n\n  softmax(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ)\n\nFor numerical stability, subtract max(z) before exponentiating — this is mathematically equivalent but prevents overflow.',
    starter:
`import math

def softmax(z):
    """
    z: list of floats (logits)
    Returns: list of probabilities (positive, sum = 1.0)
    """
    # TODO: implement with numerical stability trick
    pass

z = [3.0, 1.0, 0.2]
p = softmax(z)
print(p)          # [0.8360, 0.1131, 0.0508]
print(sum(p))     # 1.0`,
    tests: [
      { code: `s=softmax([1.,2.,3.]); assert abs(sum(s)-1.0)<1e-9, "Probabilities must sum to 1"`,
        description: 'output sums to 1.0' },
      { code: `s=softmax([1.,2.,3.]); assert s[2]>s[1]>s[0], "Largest logit must give largest probability"`,
        description: 'preserves ordering of logits' },
      { code: `s=softmax([1000.,1001.,1002.]); assert abs(sum(s)-1.0)<1e-6, "Must handle large values without overflow"`,
        description: 'numerically stable for large inputs' },
      { code: `s=softmax([0.,0.,0.]); assert all(abs(p-1/3)<1e-9 for p in s), "Equal logits -> uniform distribution"`,
        description: 'equal logits give uniform probabilities' },
    ],
    hint: 'Subtract max(z): shift = max(z), exps = [math.exp(zi - shift) for zi in z], total = sum(exps), return [e/total for e in exps].',
  },

  {
    id: 'relu',
    title: 'Implement ReLU + Backward',
    cat: 'dl', difficulty: 'easy', type: 'implement',
    description: 'ReLU (Rectified Linear Unit) is the most common hidden-layer activation.\n\n  relu(z) = max(0, z)\n\nIts derivative is the step function: 1 where z > 0, else 0. Implement both the forward pass and the backward pass (gradient w.r.t. z).',
    starter:
`def relu(z):
    """Forward: relu(z) = max(0, z). z is a list of floats."""
    # TODO
    pass

def relu_backward(dout, z):
    """
    Backward pass through ReLU.
    dout: upstream gradient (list, same length as z)
    z:    original pre-activation values (list)
    Returns: gradient w.r.t. z — passes dout where z > 0, else 0.
    """
    # TODO
    pass

print(relu([-3, -1, 0, 2, 5]))         # [0, 0, 0, 2, 5]
print(relu_backward([1,1,1,1], [-2,0,3,-1]))  # [0, 0, 1, 0]`,
    tests: [
      { code: `assert relu([-3,-1,0,2,5])==[0,0,0,2,5], "relu forward is wrong"`,
        description: 'forward pass: max(0, z)' },
      { code: `assert relu([0])==[0], "relu(0) should be 0"`,
        description: 'relu(0) = 0' },
      { code: `assert relu_backward([1,1,1,1],[-2,0,3,-1])==[0,0,1,0], "backward pass is wrong"`,
        description: 'backward: gradient blocked where z <= 0' },
      { code: `assert relu_backward([2.0,3.0],[1.0,-1.0])==[2.0,0.0], "backward should scale upstream gradient"`,
        description: 'backward: scales upstream gradient where z > 0' },
    ],
    hint: 'relu: return [max(0, v) for v in z]. relu_backward: return [dout[i] if z[i] > 0 else 0 for i in range(len(z))].',
  },

  {
    id: 'backprop-debug',
    title: 'Debug: Backprop Gradient',
    cat: 'dl', difficulty: 'medium', type: 'debug',
    description: 'This single-neuron backprop implementation has a bug in the sigmoid derivative.\n\nThe function computes analytical gradients for: z = w1*x1 + w2*x2 + b, y_hat = sigmoid(z), loss = (y_hat - y)²\n\nThe tests check correctness via numerical gradient checking — a standard debugging technique.',
    starter:
`import math

def sigmoid(z):
    return 1.0 / (1.0 + math.exp(-min(max(z, -500), 500)))

def compute_gradients(x1, x2, w1, w2, b, y):
    """
    Backprop through a single sigmoid neuron.
    Forward:  z = w1*x1 + w2*x2 + b
              y_hat = sigmoid(z)
              loss  = (y_hat - y)^2
    Returns: (dL/dw1, dL/dw2, dL/db)
    """
    # Forward pass
    z = w1*x1 + w2*x2 + b
    y_hat = sigmoid(z)

    # Backward pass
    dL_dyhat = 2 * (y_hat - y)
    dyhat_dz = y_hat * (1 + y_hat)   # <-- bug here
    dz = dL_dyhat * dyhat_dz

    return dz * x1, dz * x2, dz

dw1, dw2, db = compute_gradients(1.0, 2.0, 0.5, -0.3, 0.1, 1.0)
print(f"dw1={dw1:.6f}  dw2={dw2:.6f}  db={db:.6f}")`,
    tests: [
      { code: `
eps = 1e-5
x1,x2,w1,w2,b,y = 1.0, 2.0, 0.5, -0.3, 0.1, 1.0
def loss(w1,w2,b):
    z=w1*x1+w2*x2+b; yh=sigmoid(z); return (yh-y)**2
num_dw1=(loss(w1+eps,w2,b)-loss(w1-eps,w2,b))/(2*eps)
dw1,dw2,db=compute_gradients(x1,x2,w1,w2,b,y)
assert abs(dw1-num_dw1)<1e-4, "dw1 wrong: analytical="+str(round(dw1,6))+" numerical="+str(round(num_dw1,6))`,
        description: 'dw1 matches numerical gradient' },
      { code: `
eps = 1e-5
x1,x2,w1,w2,b,y = 1.0, 2.0, 0.5, -0.3, 0.1, 1.0
def loss(w1,w2,b):
    z=w1*x1+w2*x2+b; yh=sigmoid(z); return (yh-y)**2
num_dw2=(loss(w1,w2+eps,b)-loss(w1,w2-eps,b))/(2*eps)
dw1,dw2,db=compute_gradients(x1,x2,w1,w2,b,y)
assert abs(dw2-num_dw2)<1e-4, "dw2 wrong: analytical="+str(round(dw2,6))+" numerical="+str(round(num_dw2,6))`,
        description: 'dw2 matches numerical gradient' },
      { code: `
eps = 1e-5
x1,x2,w1,w2,b,y = 1.0, 2.0, 0.5, -0.3, 0.1, 1.0
def loss(w1,w2,b):
    z=w1*x1+w2*x2+b; yh=sigmoid(z); return (yh-y)**2
num_db=(loss(w1,w2,b+eps)-loss(w1,w2,b-eps))/(2*eps)
dw1,dw2,db=compute_gradients(x1,x2,w1,w2,b,y)
assert abs(db-num_db)<1e-4, "db wrong: analytical="+str(round(db,6))+" numerical="+str(round(num_db,6))`,
        description: 'db matches numerical gradient' },
    ],
    hint: 'The sigmoid derivative is g(z)·(1 − g(z)), not g(z)·(1 + g(z)). Fix the sign inside the parentheses.',
  },

  // ── ML Theory ─────────────────────────────────────────────────────────────

  {
    id: 'cross-entropy',
    title: 'Implement Cross-Entropy Loss',
    cat: 'th', difficulty: 'easy', type: 'implement',
    description: 'Categorical cross-entropy is the standard loss for multi-class classification:\n\n  L = −(1/m) Σᵢ Σc y_true[i][c] · log(y_pred[i][c])\n\nClip predictions to avoid log(0): use max(p, 1e-15).',
    starter:
`import math

def cross_entropy_loss(y_true, y_pred):
    """
    y_true: list of one-hot vectors  e.g. [[1,0,0], [0,1,0]]
    y_pred: list of probability vectors (each sums to 1)
    Returns: scalar mean loss (float >= 0)
    """
    # TODO: implement
    pass

y_true = [[1,0,0], [0,1,0], [0,0,1]]
y_pred = [[0.9, 0.05, 0.05],
          [0.1, 0.80, 0.10],
          [0.05,0.05, 0.90]]
print(f"loss = {cross_entropy_loss(y_true, y_pred):.4f}")  # ~0.1643`,
    tests: [
      { code: `
perfect_pred = [[1.0,0,0],[0,1.0,0],[0,0,1.0]]
perfect_true = [[1,0,0],[0,1,0],[0,0,1]]
loss = cross_entropy_loss(perfect_true, perfect_pred)
assert loss < 0.0001, "Perfect predictions should give ~0 loss, got "+str(round(loss,6))`,
        description: 'perfect predictions give ~0 loss' },
      { code: `
yt=[[1,0],[0,1]]; yp=[[0.9,0.1],[0.2,0.8]]
loss = cross_entropy_loss(yt, yp)
assert loss > 0, "Loss must be positive"
assert loss < 1.0, "Loss seems too large"`,
        description: 'loss is positive and reasonable' },
      { code: `
yt=[[1,0],[0,1]]; yp_good=[[0.9,0.1],[0.1,0.9]]; yp_bad=[[0.6,0.4],[0.4,0.6]]
assert cross_entropy_loss(yt,yp_good) < cross_entropy_loss(yt,yp_bad), "Better predictions should give lower loss"`,
        description: 'more confident correct predictions give lower loss' },
    ],
    hint: 'For each example i: add -sum(y_true[i][c] * math.log(max(y_pred[i][c], 1e-15)) for c in range(len(y_true[i]))). Divide total by m.',
  },

  {
    id: 'precision-recall',
    title: 'Implement Precision, Recall, F1',
    cat: 'th', difficulty: 'easy', type: 'implement',
    description: 'For binary classification:\n\n  Precision = TP / (TP + FP)\n  Recall    = TP / (TP + FN)\n  F1        = 2 · P · R / (P + R)\n\ny_true and y_pred are lists of 0s and 1s.',
    starter:
`def precision_recall_f1(y_true, y_pred):
    """
    Returns: (precision, recall, f1) as floats.
    Handle edge case: if denominator is 0, return 0 for that metric.
    """
    # TODO
    pass

y_true = [1, 1, 1, 0, 0, 0]
y_pred = [1, 1, 0, 1, 0, 0]
# TP=2, FP=1, FN=1  →  P=2/3, R=2/3, F1=2/3
p, r, f1 = precision_recall_f1(y_true, y_pred)
print(f"P={p:.3f}  R={r:.3f}  F1={f1:.3f}")`,
    tests: [
      { code: `p,r,f1=precision_recall_f1([1,1,1,0,0,0],[1,1,0,1,0,0]); assert abs(p-2/3)<1e-9 and abs(r-2/3)<1e-9, "P and R should both be 2/3"`,
        description: 'precision = recall = 2/3 for given example' },
      { code: `p,r,f1=precision_recall_f1([1,1,0,0],[1,1,0,0]); assert abs(p-1.0)<1e-9 and abs(r-1.0)<1e-9 and abs(f1-1.0)<1e-9, "Perfect classifier should give P=R=F1=1"`,
        description: 'perfect classifier gives P=R=F1=1' },
      { code: `p,r,f1=precision_recall_f1([1,1],[0,0]); assert r==0, "Zero recall should be handled without crash"`,
        description: 'handles zero recall gracefully' },
    ],
    hint: 'TP = sum(1 for i if y_true[i]==1 and y_pred[i]==1). FP: true=0 pred=1. FN: true=1 pred=0. Guard divisions: return 0 if denominator is 0.',
  },

  {
    id: 'l2-loss',
    title: 'Implement L2 Regularized Loss',
    cat: 'th', difficulty: 'easy', type: 'implement',
    description: 'L2 regularization adds a penalty to the loss that shrinks weights toward zero:\n\n  L_total = MSE_loss + (λ/2) · Σⱼ wⱼ²\n\nwhere MSE = (1/2m) Σᵢ (ŷᵢ − yᵢ)². The bias term is conventionally not regularized.',
    starter:
`def mse_l2(y_true, y_pred, weights, lam):
    """
    MSE loss with L2 regularization.
    y_true, y_pred: lists of floats (length m)
    weights: model weights to regularize (list, exclude bias)
    lam: regularization strength (lambda)
    Returns: scalar total loss
    """
    # TODO
    pass

y_true  = [1.0, 2.0, 3.0, 4.0]
y_pred  = [1.1, 1.9, 3.2, 3.8]
weights = [0.5, -0.3, 0.8]
print(mse_l2(y_true, y_pred, weights, lam=0.1))`,
    tests: [
      { code: `loss = mse_l2([1,2,3],[1,2,3],[0.0],0.0); assert abs(loss)<1e-9, "Perfect predictions, zero lambda -> 0 loss"`,
        description: 'perfect predictions + λ=0 gives 0' },
      { code: `l0=mse_l2([1,2],[1,2],[1.0,1.0],0.0); l1=mse_l2([1,2],[1,2],[1.0,1.0],1.0); assert l1>l0, "Adding regularization should increase loss"`,
        description: 'regularization increases loss' },
      { code: `l=mse_l2([0,0],[1,1],[0.0],0.0); assert abs(l-0.5)<1e-9, "MSE part: (1/2*2)*(1+1)=0.5"`,
        description: 'MSE component is correct' },
    ],
    hint: 'mse = sum((yp-yt)**2 for yp,yt in zip(y_pred,y_true)) / (2*len(y_true))   reg = (lam/2) * sum(w**2 for w in weights)   return mse + reg',
  },

  // ── Unsupervised Learning ─────────────────────────────────────────────────

  {
    id: 'kmeans-assign',
    title: 'Implement k-Means Assignment',
    cat: 'un', difficulty: 'easy', type: 'implement',
    description: 'The E-step of k-means: assign each data point to the nearest centroid.\n\nReturn a list of integer cluster indices (0-indexed), one per point.',
    starter:
`def assign_clusters(X, centroids):
    """
    X:         list of points, each a list of floats
    centroids: list of centroid positions (same dimensionality)
    Returns:   list of int cluster assignments (0 to k-1)
    """
    def sq_dist(a, b):
        return sum((a[i]-b[i])**2 for i in range(len(a)))

    # TODO: for each point, return index of the nearest centroid
    pass

X = [[0,0],[1,0],[0,1],[9,9],[10,9],[9,10]]
centroids = [[0,0], [9,9]]
print(assign_clusters(X, centroids))   # [0,0,0,1,1,1]`,
    tests: [
      { code: `a=assign_clusters([[0,0],[10,10],[1,0],[9,9]],[[0,0],[10,10]]); assert a==[0,1,0,1], "Got "+str(a)`,
        description: 'two well-separated clusters' },
      { code: `a=assign_clusters([[5,5]],[[0,0],[10,10]]); assert a==[0] or a==[1], "Equidistant point can go to either cluster"`,
        description: 'handles equidistant point' },
      { code: `a=assign_clusters([[1,0],[0,1],[9,0],[8,1]],[[0,0],[9,0]]); assert a[0]==0 and a[2]==1, "Got "+str(a)`,
        description: 'correct assignment in 2D' },
    ],
    hint: 'For each point x in X: compute sq_dist(x, c) for every centroid c, then return the index of the minimum. Use Python\'s min() with enumerate or a loop.',
  },

  {
    id: 'kmeans-update-debug',
    title: 'Debug: k-Means Centroid Update',
    cat: 'un', difficulty: 'easy', type: 'debug',
    description: 'The M-step of k-means should move each centroid to the mean of its assigned points.\n\nThis implementation computes the sum instead of the mean. Fix it.',
    starter:
`def update_centroids(X, assignments, k):
    """
    M-step: move each centroid to the mean of its assigned points.
    X:           list of points (list of lists)
    assignments: list of int cluster indices
    k:           number of clusters
    Returns:     list of k centroid positions
    """
    d = len(X[0])
    centroids = []
    for j in range(k):
        cluster = [X[i] for i in range(len(X)) if assignments[i] == j]
        if cluster:
            centroid = [sum(p[dim] for p in cluster) for dim in range(d)]  # <-- bug
        else:
            centroid = [0.0] * d
        centroids.append(centroid)
    return centroids

X = [[1.,2.],[3.,4.],[5.,6.],[7.,8.]]
c = update_centroids(X, [0,0,1,1], k=2)
print(c)   # should be [[2.0, 3.0], [6.0, 7.0]]`,
    tests: [
      { code: `c=update_centroids([[1.,2.],[3.,4.],[5.,6.],[7.,8.]],[0,0,1,1],2); assert abs(c[0][0]-2.0)<1e-9 and abs(c[0][1]-3.0)<1e-9, "Centroid 0 should be [2,3], got "+str(c[0])`,
        description: 'centroid 0 is the mean of its points' },
      { code: `c=update_centroids([[1.,2.],[3.,4.],[5.,6.],[7.,8.]],[0,0,1,1],2); assert abs(c[1][0]-6.0)<1e-9 and abs(c[1][1]-7.0)<1e-9, "Centroid 1 should be [6,7], got "+str(c[1])`,
        description: 'centroid 1 is the mean of its points' },
    ],
    hint: 'Divide the sum by len(cluster): centroid = [sum(...)/len(cluster) for dim in range(d)]',
  },

  {
    id: 'pca',
    title: 'Implement PCA',
    cat: 'un', difficulty: 'hard', type: 'implement',
    description: 'PCA finds the directions of maximum variance in data.\n\nSteps:\n1. Compute covariance matrix: Σ = (1/n) XᵀX  (X already mean-centered)\n2. Eigendecompose Σ\n3. Sort eigenvectors by descending eigenvalue\n4. Project: X_reduced = X @ U_k\n\nReturn the (n, k) projected data matrix.',
    starter:
`import numpy as np

def pca(X, k):
    """
    X: (n, d) numpy array — assumed mean-centered
    k: number of components to keep
    Returns: (n, k) projected data
    """
    # TODO: implement the 4 steps above
    pass

np.random.seed(0)
X = np.random.randn(50, 4)
X -= X.mean(axis=0)          # mean-center
X_proj = pca(X, 2)
print("Input shape: ", X.shape)
print("Output shape:", X_proj.shape)  # (50, 2)`,
    tests: [
      { code: `import numpy as np; np.random.seed(0); X=np.random.randn(50,4); X-=X.mean(axis=0); out=pca(X,2); assert out.shape==(50,2), "Shape should be (50,2), got "+str(out.shape)`,
        description: 'output has correct shape (n, k)' },
      { code: `import numpy as np; X=np.array([[2.,0.],[2.,0.],[-2.,0.],[-2.,0.]]); out=pca(X,1); assert out.shape==(4,1), "Shape wrong"; assert all(abs(abs(out[i,0])-2.0)<1e-9 for i in range(4)), "First PC should capture the 2/-2 variation"`,
        description: 'captures dominant variance direction' },
      { code: `import numpy as np; np.random.seed(1); X=np.random.randn(100,5); X-=X.mean(axis=0); out=pca(X,3); assert out.shape==(100,3)`,
        description: 'works for arbitrary n, d, k' },
    ],
    hint: 'cov = X.T @ X / len(X)   eigenvalues, eigenvectors = np.linalg.eigh(cov)   sort descending: idx = np.argsort(eigenvalues)[::-1]   U_k = eigenvectors[:, idx[:k]]   return X @ U_k',
  },

  // ── Decision Trees ────────────────────────────────────────────────────────

  {
    id: 'gini',
    title: 'Implement Gini Impurity',
    cat: 'dt', difficulty: 'easy', type: 'implement',
    description: 'Gini impurity measures how often a randomly chosen element would be incorrectly classified:\n\n  Gini(R) = 1 − Σc p̂c²\n\nwhere p̂c is the fraction of examples with label c. A pure node (all one class) has Gini = 0.',
    starter:
`def gini_impurity(labels):
    """
    labels: list of class labels (any hashable type)
    Returns: Gini impurity in [0, 1-1/k]
    """
    # TODO: compute class fractions, then 1 - sum(p^2)
    pass

print(gini_impurity([0,0,0,0]))      # 0.0   (pure)
print(gini_impurity([0,0,1,1]))      # 0.5   (maximally impure, 2 classes)
print(gini_impurity([0,1,2,3]))      # 0.75  (uniform 4-class)
print(gini_impurity(['a','a','b']))  # ~0.444`,
    tests: [
      { code: `assert gini_impurity([0,0,0,0])==0.0, "Pure node should have 0 impurity"`,
        description: 'pure node → Gini = 0' },
      { code: `assert abs(gini_impurity([0,0,1,1])-0.5)<1e-9, "50/50 split should give 0.5"`,
        description: '50/50 binary split → Gini = 0.5' },
      { code: `assert abs(gini_impurity([0,1,2])-2/3)<1e-9, "Uniform 3-class should give 2/3"`,
        description: 'uniform 3-class → Gini = 2/3' },
      { code: `assert 0 <= gini_impurity([0,0,1,1,2]) <= 1, "Gini must be in [0,1]"`,
        description: 'result is always in [0, 1]' },
    ],
    hint: 'Count occurrences of each label, divide by total to get p_c. Return 1 - sum(p**2 for p in proportions). Use a dict or collections.Counter.',
  },

  // ── Generative Learning ───────────────────────────────────────────────────

  {
    id: 'naive-bayes',
    title: 'Implement Naive Bayes Predict',
    cat: 'gen', difficulty: 'medium', type: 'implement',
    description: 'Naive Bayes classifies by computing the log posterior for each class:\n\n  log P(y|x) ∝ log P(y) + Σⱼ log P(xⱼ|y)\n\nWork in log space to avoid underflow. Return the class with the highest log-posterior score.',
    starter:
`import math

def naive_bayes_predict(x, log_priors, log_likelihoods):
    """
    x: list of binary feature values (0 or 1)
    log_priors:      {class_label: log P(y = class)}
    log_likelihoods: {class_label: [log P(x_j=1|y), log P(x_j=0|y)] for each feature j}
    Returns: predicted class label
    """
    # TODO: for each class, compute log P(y) + sum_j log P(x_j | y)
    # Return the class with the highest score
    pass

# Spam classifier: 2 features (contains "free", contains "meeting")
log_priors = {'spam': math.log(0.4), 'ham': math.log(0.6)}
log_likelihoods = {
    'spam': [[math.log(0.9), math.log(0.1)],   # P(free=1|spam)=0.9
             [math.log(0.2), math.log(0.8)]],   # P(meeting=1|spam)=0.2
    'ham':  [[math.log(0.1), math.log(0.9)],
             [math.log(0.8), math.log(0.2)]],
}
print(naive_bayes_predict([1, 0], log_priors, log_likelihoods))  # 'spam'
print(naive_bayes_predict([0, 1], log_priors, log_likelihoods))  # 'ham'`,
    tests: [
      { code: `
import math
lp={'spam':math.log(0.4),'ham':math.log(0.6)}
ll={'spam':[[math.log(0.9),math.log(0.1)],[math.log(0.2),math.log(0.8)]],'ham':[[math.log(0.1),math.log(0.9)],[math.log(0.8),math.log(0.2)]]}
assert naive_bayes_predict([1,0],lp,ll)=='spam', "x=[free=1,meeting=0] should be spam"`,
        description: '"free" present → classified as spam' },
      { code: `
import math
lp={'spam':math.log(0.4),'ham':math.log(0.6)}
ll={'spam':[[math.log(0.9),math.log(0.1)],[math.log(0.2),math.log(0.8)]],'ham':[[math.log(0.1),math.log(0.9)],[math.log(0.8),math.log(0.2)]]}
assert naive_bayes_predict([0,1],lp,ll)=='ham', "x=[free=0,meeting=1] should be ham"`,
        description: '"meeting" present → classified as ham' },
    ],
    hint: 'For each class c: score = log_priors[c] + sum(log_likelihoods[c][j][x[j]] for j in range(len(x))). Return the class with max score.',
  },

  // ── Reinforcement Learning ────────────────────────────────────────────────

  {
    id: 'bellman',
    title: 'Implement Value Iteration Step',
    cat: 'rl', difficulty: 'medium', type: 'implement',
    description: 'One step of value iteration applies the Bellman backup to every state:\n\n  V_new(s) = R(s) + γ · max_a Σs\' P(s\'|s,a) · V(s\')\n\nReturn a new dict with updated values for all states.',
    starter:
`def value_iteration_step(rewards, transitions, V, gamma=0.9):
    """
    rewards:     {state: immediate reward}
    transitions: {state: {action: {next_state: probability}}}
    V:           {state: current value estimate}
    gamma:       discount factor
    Returns:     new V dict after one Bellman backup
    """
    # TODO: implement
    pass

rewards = {'A': 0, 'B': 0, 'C': 10}
transitions = {
    'A': {'go': {'B': 1.0}},
    'B': {'go': {'C': 1.0}},
    'C': {'stay': {'C': 1.0}},
}
V = {'A': 0, 'B': 0, 'C': 0}
V1 = value_iteration_step(rewards, transitions, V)
print(V1)   # C=10, B=9, A=0
V2 = value_iteration_step(rewards, transitions, V1)
print(V2)   # C=10, B=9, A=8.1`,
    tests: [
      { code: `
r={'A':0,'B':0,'C':10}; t={'A':{'go':{'B':1.0}},'B':{'go':{'C':1.0}},'C':{'stay':{'C':1.0}}}
V0={'A':0,'B':0,'C':0}
V1=value_iteration_step(r,t,V0)
assert abs(V1['C']-10.0)<1e-9, "V(C) after 1 step should be 10"
assert abs(V1['B']-9.0)<1e-9,  "V(B) after 1 step should be 9"`,
        description: 'first Bellman backup: C=10, B=9' },
      { code: `
r={'A':0,'B':0,'C':10}; t={'A':{'go':{'B':1.0}},'B':{'go':{'C':1.0}},'C':{'stay':{'C':1.0}}}
V0={'A':0,'B':0,'C':0}
V1=value_iteration_step(r,t,V0)
V2=value_iteration_step(r,t,V1)
assert abs(V2['A']-0.9*9.0)<1e-9, "V(A) after 2 steps should be 0.9*9=8.1"`,
        description: 'second backup propagates value to A' },
    ],
    hint: 'For each state s: action_values = [sum(prob*V[ns] for ns,prob in transitions[s][a].items()) for a in transitions[s]]. V_new[s] = rewards[s] + gamma * max(action_values).',
  },

  {
    id: 'qlearning-debug',
    title: 'Debug: Q-Learning Update',
    cat: 'rl', difficulty: 'medium', type: 'debug',
    description: 'Q-learning uses the Bellman optimality equation:\n\n  Q(s,a) ← Q(s,a) + α · [r + γ · max_a\' Q(s\',a\') − Q(s,a)]\n\nThe bug: this implementation uses Q(s\', a) — the same action — instead of the max over all next actions. Fix it.',
    starter:
`def q_update(Q, s, a, r, s_next, actions, alpha=0.1, gamma=0.9):
    """
    Q:       dict of dicts — Q[state][action] = value
    s, a:    current state and action taken
    r:       reward received
    s_next:  next state
    actions: list of all possible actions
    """
    # BUG: should use max over all actions in s_next
    next_val = Q[s_next][a]   # <-- bug: using same action, not max
    td_error = r + gamma * next_val - Q[s][a]
    Q[s][a] = Q[s][a] + alpha * td_error
    return Q

Q = {'s0': {'a0': 0.0, 'a1': 0.0},
     's1': {'a0': 0.5, 'a1': 2.0}}   # a1 is better in s1
actions = ['a0', 'a1']

Q = q_update(Q, 's0', 'a0', r=1.0, s_next='s1', actions=actions)
print(f"Q(s0,a0) = {Q['s0']['a0']:.4f}")
# With max: 0 + 0.1*(1.0 + 0.9*2.0 - 0) = 0.1*(1+1.8) = 0.28`,
    tests: [
      { code: `
Q={'s0':{'a0':0.0,'a1':0.0},'s1':{'a0':0.5,'a1':2.0}}
Q=q_update(Q,'s0','a0',r=1.0,s_next='s1',actions=['a0','a1'])
expected=0.1*(1.0+0.9*2.0)
assert abs(Q['s0']['a0']-expected)<1e-9, "Q(s0,a0) should be "+str(round(expected,4))+", got "+str(round(Q['s0']['a0'],4))`,
        description: 'uses max Q(s\',·) = 2.0, not Q(s\',a0) = 0.5' },
      { code: `
Q={'s0':{'a0':0.0},'s1':{'a0':1.0,'a1':5.0,'a2':3.0}}
Q=q_update(Q,'s0','a0',r=0.0,s_next='s1',actions=['a0','a1','a2'])
assert abs(Q['s0']['a0']-0.1*0.9*5.0)<1e-9, "Max Q in s1 is 5.0"`,
        description: 'selects maximum over 3 actions' },
    ],
    hint: 'Replace Q[s_next][a] with max(Q[s_next][a_] for a_ in actions). The key idea of Q-learning: use the greedy next value regardless of what action you\'ll actually take.',
  },

];
